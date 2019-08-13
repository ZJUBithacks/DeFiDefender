from umbral import config
from umbral.curve import SECP256K1
from umbral import keys, signing
from umbral import pre
import base64
import pickle
import os

config.set_default_curve(SECP256K1)


class ReEncryption:

    def generateKeys(account) -> bytes:
        private_key = keys.UmbralPrivateKey.gen_key()
        public_key = private_key.get_pubkey()
        signing_key = keys.UmbralPrivateKey.gen_key()
        verifying_key = signing_key.gen_key()
        pub_res = {}
        pri_res = {}
        pri_res['private_key'] = private_key.to_bytes()
        pri_res['signing_key'] = signing_key.to_bytes()
        pub_res['public_key'] = public_key.to_bytes().decode('iso-8859-15')
        pub_res['verifying_key'] = verifying_key.to_bytes().decode('iso-8859-15')
        with open(account + '_privacy', 'wb') as file:
            pickle.dump(pri_res, file)
        return pub_res.__str__()

    def encryptInfo(account: str) -> str:
        with open('example.jpeg', 'rb') as f:
            img = base64.b64encode(f.read())
            f.close()
        with open(account + '_privacy', 'rb') as f:
            user_info_bytes = pickle.load(f)
            f.close()
        owner_pri_key = keys.UmbralPrivateKey.from_bytes(user_info_bytes['private_key'])
        owner_pub_key = owner_pri_key.get_pubkey()
        ciphertext, capsule = pre.encrypt(owner_pub_key, img)
        res = {}
        res['ciphertext'] = ciphertext.decode('iso-8859-15')
        res['capsule'] = capsule.to_bytes().decode('iso-8859-15')
        return res.__str__()

    def generateKfrags(account: str, access_pub_key):
        with open(account + '_privacy', 'rb') as f:
            user_info_bytes = pickle.load(f)
            f.close()
        owner_pri_key = keys.UmbralPrivateKey.from_bytes(user_info_bytes['private_key'])
        owner_signing_key = keys.UmbralPrivateKey.from_bytes(user_info_bytes['signing_key'])
        signer = signing.Signer(private_key=owner_signing_key)
        kfrags = pre.generate_kfrags(delegating_privkey=owner_pri_key,
                                     signer=signer,
                                     receiving_pubkey=access_pub_key,
                                     threshold=1,
                                     N=2)
        res = {}
        bytes_kfrags = list()
        for v in kfrags:
            bytes_kfrags.append(v.to_bytes().decode('iso-8859-15'))
        res['kfrags'] = bytes_kfrags
        return res.__str__()

    def reencryption(a_pub_key_bytes, a_ver_key_bytes, b_pub_key_bytes, kfrags_bytes, capsule_bytes):
        kfrags = list()
        for v in kfrags_bytes:
            kfrag = pre.KFrag.from_bytes(v)
            kfrags.append(kfrag)
        a_pub_key = keys.UmbralPublicKey.from_bytes(a_pub_key_bytes)
        a_ver_key = keys.UmbralPublicKey.from_bytes(a_ver_key_bytes)
        b_pub_key = keys.UmbralPublicKey.from_bytes(b_pub_key_bytes)
        capsule = pre.Capsule.from_bytes(capsule_bytes, a_pub_key.params)
        capsule.set_correctness_keys(delegating=a_pub_key,
                                     receiving=b_pub_key,
                                     verifying=a_ver_key)
        cfrags_bytes = list()
        for kfrag in kfrags:
            cfrag = pre.reencrypt(kfrag=kfrag, capsule=capsule)
            cfrags_bytes.append(cfrag.to_bytes())
        return cfrags_bytes

    def decrypt(account, a_pub_key_bytes, a_ver_key_bytes, ciphertext, cfrags_bytes, capsule_bytes) -> str:
        with open(account + '_privacy', 'rb') as f:
            user_info_bytes = pickle.load(f)
            f.close()
        pri_key = keys.UmbralPrivateKey.from_bytes(user_info_bytes['private_key'])
        pub_key = pri_key.get_pubkey()
        a_pub_key = keys.UmbralPublicKey.from_bytes(a_pub_key_bytes)
        a_ver_key = keys.UmbralPublicKey.from_bytes(a_ver_key_bytes)
        capsule = pre.Capsule.from_bytes(capsule_bytes, pub_key.params)
        capsule.set_correctness_keys(delegating=a_pub_key, receiving=pub_key, verifying=a_ver_key)
        cfrags = list()
        for cfrag_bytes in cfrags_bytes:
            cfrag = pre.CapsuleFrag.from_bytes(cfrag_bytes)
            cfrags.append(cfrag)
        for cfrag in cfrags:
            capsule.attach_cfrag(cfrag)
        img_bytes = pre.decrypt(ciphertext=ciphertext,
                                capsule=capsule,
                                decrypting_key=pri_key)
        img = base64.b64decode(img_bytes)
        with open('return_example.jpeg', 'wb') as f:
            f.write(img)
            f.close()
        path = os.path.abspath(__file__) + '/return_example.jpeg'
        return path

    def getData(owner, reader, ciphertext, capsule_bytes) -> str:
        with open(owner + '_privacy', 'rb') as f:
            owner_info_bytes = pickle.load(f)
            f.close()
        owner_pri_key = keys.UmbralPrivateKey.from_bytes(owner_info_bytes['private_key'])
        owner_pub_key = owner_pri_key.get_pubkey()
        owner_signing_key = keys.UmbralPrivateKey.from_bytes(owner_info_bytes['signing_key'])
        owner_ver_key = owner_signing_key.get_pubkey()
        with open(reader + '_privacy', 'rb') as f:
            reader_info_bytes = pickle.load(f)
            f.close()
        reader_pri_key = keys.UmbralPrivateKey.from_bytes(reader_info_bytes['private_key'])
        reader_pub_key = reader_pri_key.get_pubkey()
        reader_ver_key = keys.UmbralPrivateKey.from_bytes(reader_info_bytes['signing_key']).get_pubkey()
        signer = signing.Signer(private_key=owner_signing_key)
        kfrags = pre.generate_kfrags(delegating_privkey=owner_pri_key,
                                     signer=signer,
                                     receiving_pubkey=reader_pub_key,
                                     threshold=1,
                                     N=2)
        capsule = pre.Capsule.from_bytes(capsule_bytes, owner_pub_key.params)
        capsule.set_correctness_keys(delegating=owner_pub_key,
                                     receiving=reader_pub_key,
                                     verifying=owner_ver_key)
        cfrags = list()
        for kfrag in kfrags:
            cfrag = pre.reencrypt(kfrag=kfrag, capsule=capsule)
            cfrags.append(cfrag)
        for cfrag in cfrags:
            capsule.attach_cfrag(cfrag)
        img_bytes = pre.decrypt(ciphertext=ciphertext,
                                capsule=capsule,
                                decrypting_key=reader_pri_key)
        img = base64.b64decode(img_bytes)
        with open('return_example.jpeg', 'wb') as f:
            f.write(img)
            f.close()
        path = os.path.abspath(__file__) + '/return_example.jpeg'
        return path

# ReEncryption.generateKeys('Alice')
# ReEncryption.generateKeys('Bob')

# with open('Alice_privacy', 'rb') as f:
#     alice = pickle.load(f)
#     f.close()
# with open('Bob_privacy', 'rb') as f:
#     bob = pickle.load(f)
#     f.close()
#
# alice_private_key = keys.UmbralPrivateKey.from_bytes(alice['private_key'])
# alice_public_key = alice_private_key.get_pubkey()
# alice_signing_key = keys.UmbralPrivateKey.from_bytes(alice['signing_key'])
# alice_verifying_key = alice_signing_key.get_pubkey()
#
# bob_private_key = keys.UmbralPrivateKey.from_bytes(bob['private_key'])
# bob_public_key = bob_private_key.get_pubkey()
# bob_signing_key = keys.UmbralPrivateKey.from_bytes(bob['signing_key'])
# bob_verifying_key = bob_signing_key.get_pubkey()
#
# info = ReEncryption.encryptInfo('Alice', bob_public_key.to_bytes())
# dict = ast.literal_eval(info)
# ciphertext, capsule_bytes, kfrags_bytes = dict['ciphertext'], dict['capsule'], dict['kfrags']
# print(ciphertext)
# print(capsule_bytes)
# print(kfrags_bytes)
#
# cfrags_bytes = ReEncryption.reencryption(alice_public_key.to_bytes(), alice_verifying_key.to_bytes(),
#                                          bob_public_key.to_bytes(), kfrags_bytes, capsule_bytes)
# print(cfrags_bytes)
#
# img = ReEncryption.decrypt('Bob', alice_public_key, alice_verifying_key, ciphertext, cfrags_bytes, capsule_bytes)
# with open('return_example.jpeg', 'wb') as f:
#     f.write(img)
#     f.close()
