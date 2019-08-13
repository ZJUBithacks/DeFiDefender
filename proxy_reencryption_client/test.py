from umbral import config
from umbral.curve import SECP256K1

config.set_default_curve(SECP256K1)
from umbral import keys, signing

alices_private_key = keys.UmbralPrivateKey.gen_key()
alices_public_key = alices_private_key.get_pubkey()

alices_signing_key = keys.UmbralPrivateKey.gen_key()
alices_verifying_key = alices_signing_key.get_pubkey()
alices_signer = signing.Signer(private_key=alices_signing_key)

from umbral import pre

plaintext = b'Proxy Re-encryption is cool!'
ciphertext, capsule = pre.encrypt(alices_public_key, plaintext)

from umbral import keys

bobs_private_key = keys.UmbralPrivateKey.gen_key()
bobs_public_key = bobs_private_key.get_pubkey()
kfrags = pre.generate_kfrags(delegating_privkey=alices_private_key,
                             signer=alices_signer,
                             receiving_pubkey=bobs_public_key,
                             threshold=10,
                             N=20)
import random

kfrags = random.sample(kfrags, 10)
capsule.set_correctness_keys(delegating=alices_public_key,
                             receiving=bobs_public_key,
                             verifying=alices_verifying_key)
cfrags = list()
for kfrag in kfrags:
    cfrag = pre.reencrypt(kfrag=kfrag, capsule=capsule)
    cfrags.append(cfrag)

# capsule.set_correctness_keys(delegating=alices_public_key,receiving=bobs_public_key,verifying=alices_verifying_key)
for cfrag in cfrags:
    capsule.attach_cfrag(cfrag)
cleartext = pre.decrypt(ciphertext=ciphertext,
                        capsule=capsule,
                        decrypting_key=bobs_private_key)
print(cleartext)
