from flask import Flask, request
import re_encryption
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app, supports_credentials=True)


@app.route('/')
def hello_world():
    return 'Hello World'


@app.route('/gen_key', methods=["POST"])
def gen_key():
    print('gen_key:调用成功')
    params = json.loads(request.get_data(as_text=True))
    print(params['account'])
    return re_encryption.ReEncryption.generateKeys(params['account'])


@app.route('/uploadData', methods=["POST"])
def upload():
    print('upload:调用成功')
    params = json.loads(request.get_data(as_text=True))
    print(params)
    account = params['account']
    return re_encryption.ReEncryption.encryptInfo(account)


@app.route('/generateKfrags', methods=["POST"])
def generateKfrags():
    print('generate Kfrags:调用成功')
    params = json.loads(request.get_data(as_text=True))
    print(params)
    account = params['account']
    access_pub_key = params['access_pub_key']
    return re_encryption.ReEncryption.generateKfrags(account, access_pub_key)


@app.route('/reencryption', methods=["POST"])
def reencryption():
    print('reencryption:调用成功')
    params = json.loads(request.get_data(as_text=True))
    print(params)
    a_pub_key_bytes = params['a_pub_key'].encode('iso-8859-15')
    a_ver_key_bytes = params['a_ver_key'].encode('iso-8859-15')
    b_pub_key_bytes = params['b_pub_key'].encode('iso-8859-15')
    kfrags_list = params['kfrags']
    kfrags_bytes = {}
    for v in kfrags_list:
        kfrags_bytes.push(v.encode('iso-8859-15'))
    capsule_bytes = params['capsule'].encode('iso-8859-15')
    return re_encryption.ReEncryption.reencryption(a_pub_key_bytes, a_ver_key_bytes, b_pub_key_bytes, kfrags_bytes,
                                                   capsule_bytes)


@app.route('/decrypt', methods=["POST"])
def decrypt():
    print('decrypt:调用成功')
    params = json.loads(request.get_data(as_text=True))
    print(params)
    account = params['account']
    a_pub_key_bytes = params['a_pub_key'].encode('iso-8859-15')
    a_ver_key_bytes = params['a_ver_key'].encode('iso-8859-15')
    ciphertext = params['ciphertext'].encode('iso-8859-15')
    cfrags_bytes = params['cfrags'].encode('iso-8859-15')
    capsule_bytes = params['capsule'].encode('iso-8859-15')
    return re_encryption.ReEncryption.decrypt(account, a_pub_key_bytes, a_ver_key_bytes, ciphertext, cfrags_bytes,
                                              capsule_bytes)


@app.route('/getData', methods=["POST"])
def getData():
    print('getData:调用成功')
    params = json.loads(request.get_data(as_text=True))
    print(params)
    owner = params['owner']
    reader = params['reader']
    ciphertext = params['ciphertext'].encode('iso-8859-15')
    capsule_bytes = params['capsule'].encode('iso-8859-15')
    return re_encryption.ReEncryption.getData(owner, reader, ciphertext, capsule_bytes)


if __name__ == '__main__':
    app.run()
