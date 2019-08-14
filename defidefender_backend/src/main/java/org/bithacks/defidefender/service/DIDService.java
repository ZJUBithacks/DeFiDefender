package org.bithacks.defidefender.service;

import com.alibaba.fastjson.JSONObject;
import com.webank.weid.constant.ErrorCode;
import com.webank.weid.protocol.base.*;
import com.webank.weid.protocol.request.*;
import com.webank.weid.protocol.response.CreateWeIdDataResult;
import com.webank.weid.protocol.response.ResponseData;
import com.webank.weid.rpc.*;
import com.webank.weid.service.impl.*;
import com.webank.weid.util.DataToolUtils;
import org.bithacks.defidefender.utils.CommonUtils;
import org.bithacks.defidefender.utils.FileUtil;
import org.bithacks.defidefender.utils.PrivateKeyUtil;
import org.bithacks.defidefender.utils.PropertiesUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DIDService {
    private static final Logger logger = LoggerFactory.getLogger(DIDService.class);

    private AuthorityIssuerService authorityIssuerService = new AuthorityIssuerServiceImpl();

    private CptService cptService = new CptServiceImpl();

    private CredentialService credentialService = new CredentialServiceImpl();

    private WeIdService weIdService = new WeIdServiceImpl();

    /**
     * set validity period to 360 days by default.
     */
    private static final long EXPIRATION_DATE = 1000L * 60 * 60 * 24 * 360;

    /**
     * create weId and set related properties.
     *
     * @return returns the create weId and public private keys
     */
    public ResponseData<CreateWeIdDataResult> createWeIdWithSetAttr() {

        logger.info("begin create weId and set attribute");

        // 1, create weId, this method automatically creates public and private keys
        ResponseData<CreateWeIdDataResult> createResult = weIdService.createWeId();
        logger.info(
                "weIdService is result,errorCode:{},errorMessage:{}",
                createResult.getErrorCode(), createResult.getErrorMessage()
        );

        if (createResult.getErrorCode().intValue() != ErrorCode.SUCCESS.getCode()) {
            return createResult;
        }

        // 2, call set public key
        ResponseData<Boolean> setPublicKeyRes = this.setPublicKey(createResult.getResult());
        if (!setPublicKeyRes.getResult()) {
            createResult.setErrorCode(
                    ErrorCode.getTypeByErrorCode(setPublicKeyRes.getErrorCode())
            );
            return createResult;
        }

        // 3, call set authentication
        ResponseData<Boolean> setAuthenticateRes = this.setAuthentication(createResult.getResult());
        if (!setAuthenticateRes.getResult()) {
            createResult.setErrorCode(
                    ErrorCode.getTypeByErrorCode(setAuthenticateRes.getErrorCode())
            );
            return createResult;
        }
        return createResult;
    }

    /**
     * Set Public Key For WeIdentity DID Document.
     *
     * @param createWeIdDataResult the object of CreateWeIdDataResult
     * @return the response data
     */
    private ResponseData<Boolean> setPublicKey(CreateWeIdDataResult createWeIdDataResult) {

        // build setPublicKey parameters.
        SetPublicKeyArgs setPublicKeyArgs = new SetPublicKeyArgs();
        setPublicKeyArgs.setWeId(createWeIdDataResult.getWeId());
        setPublicKeyArgs.setPublicKey(createWeIdDataResult.getUserWeIdPublicKey().getPublicKey());
        setPublicKeyArgs.setType("secp256k1");
        setPublicKeyArgs.setUserWeIdPrivateKey(new WeIdPrivateKey());
        setPublicKeyArgs.getUserWeIdPrivateKey()
                .setPrivateKey(createWeIdDataResult.getUserWeIdPrivateKey().getPrivateKey());

        // call SDK method to chain set attribute.
        ResponseData<Boolean> setResponse = weIdService.setPublicKey(setPublicKeyArgs);
        return setResponse;
    }

    /**
     * Set Authentication For WeIdentity DID Document.
     *
     * @param createWeIdDataResult createWeIdDataResult the object of CreateWeIdDataResult
     * @return the response data
     */
    private ResponseData<Boolean> setAuthentication(CreateWeIdDataResult createWeIdDataResult) {

        // build setAuthentication parameters.
        SetAuthenticationArgs setAuthenticationArgs = new SetAuthenticationArgs();
        setAuthenticationArgs.setWeId(createWeIdDataResult.getWeId());
        setAuthenticationArgs
                .setPublicKey(createWeIdDataResult.getUserWeIdPublicKey().getPublicKey());
        setAuthenticationArgs.setUserWeIdPrivateKey(new WeIdPrivateKey());
        setAuthenticationArgs.getUserWeIdPrivateKey()
                .setPrivateKey(createWeIdDataResult.getUserWeIdPrivateKey().getPrivateKey());

        // call SDK method to chain set attribute.
        ResponseData<Boolean> setResponse = weIdService.setAuthentication(setAuthenticationArgs);
        logger.info(
                "setAuthentication is result,errorCode:{},errorMessage:{}",
                setResponse.getErrorCode(),
                setResponse.getErrorMessage()
        );
        return setResponse;
    }

    public ResponseData<Boolean> registerIssuerType(String issuer, String authorityName) {
        WeIdAuthentication weIdAuthentication = new WeIdAuthentication();
        weIdAuthentication.setWeId(issuer);

        WeIdPrivateKey weIdPrivateKey = new WeIdPrivateKey();
        String privateKey = PrivateKeyUtil.getPrivateKeyByWeId("keys/", issuer);
        System.out.println(privateKey);
        weIdPrivateKey.setPrivateKey(privateKey);
        weIdAuthentication.setWeIdPrivateKey(weIdPrivateKey);

        weIdAuthentication.setWeIdPublicKeyId(issuer);
        AuthorityIssuerService authorityIssuerService = new AuthorityIssuerServiceImpl();
        ResponseData<Boolean> government = authorityIssuerService.registerIssuerType(weIdAuthentication, authorityName);
        return government;
    }

    /**
     * register on the chain as an authoritative body.
     *
     * @param authorityName the name of the issue
     * @return true is success, false is failure
     */
    public ResponseData<Boolean> registerAuthorityIssuer(String issuer, String authorityName) {

        // build registerAuthorityIssuer parameters.
        AuthorityIssuer authorityIssuerResult = new AuthorityIssuer();
        authorityIssuerResult.setWeId(issuer);
        authorityIssuerResult.setName(authorityName);
        authorityIssuerResult.setAccValue("0");

        RegisterAuthorityIssuerArgs registerAuthorityIssuerArgs = new RegisterAuthorityIssuerArgs();
        registerAuthorityIssuerArgs.setAuthorityIssuer(authorityIssuerResult);
        registerAuthorityIssuerArgs.setWeIdPrivateKey(new WeIdPrivateKey());

        // getting SDK private key from file.
        String privKey = FileUtil.getDataByPath(PrivateKeyUtil.SDK_PRIVKEY_PATH);

        registerAuthorityIssuerArgs.getWeIdPrivateKey().setPrivateKey(privKey);

        ResponseData<Boolean> registResponse =
                authorityIssuerService.registerAuthorityIssuer(registerAuthorityIssuerArgs);
        logger.info(
                "registerAuthorityIssuer is result,errorCode:{},errorMessage:{}",
                registResponse.getErrorCode(),
                registResponse.getErrorMessage()
        );
        return registResponse;
    }

    /**
     * registered CPT.
     *
     * @param publisher  the weId of the publisher
     * @param privateKey the private key of the publisher
     * @param claim      claim is CPT
     * @return returns cptBaseInfo
     */
    public ResponseData<CptBaseInfo> registCpt(
            String publisher,
            String privateKey,
            Map<String, Object> claim) {

        // build registerCpt parameters.
        WeIdAuthentication weIdAuthentication = new WeIdAuthentication();
        weIdAuthentication.setWeId(publisher);
        weIdAuthentication.setWeIdPrivateKey(new WeIdPrivateKey());
        weIdAuthentication.getWeIdPrivateKey().setPrivateKey(privateKey);

        CptMapArgs cptMapArgs = new CptMapArgs();
        cptMapArgs.setWeIdAuthentication(weIdAuthentication);
        cptMapArgs.setCptJsonSchema(claim);

        // create CPT by SDK
        ResponseData<CptBaseInfo> response = cptService.registerCpt(cptMapArgs);
        logger.info(
                "registerCpt is result,errorCode:{},errorMessage:{}",
                response.getErrorCode(),
                response.getErrorMessage()
        );
        return response;
    }

    /**
     * create credential.
     *
     * @param cptId      the cptId of CPT
     * @param issuer     the weId of issue
     * @param privateKey the private key of issuer
     * @param claimData  the data of claim
     * @return returns credential
     */
    public ResponseData<CredentialPojo> createCredential(
            Integer cptId,
            String issuer,
            String privateKey,
            Map<String, Object> claimData) {
        CredentialPojoService credentialPojoService = new CredentialPojoServiceImpl();
        CreateCredentialPojoArgs<Map<String, Object>> createCredentialPojoArgs = new CreateCredentialPojoArgs<Map<String, Object>>();
        createCredentialPojoArgs.setCptId(cptId);
        createCredentialPojoArgs.setIssuer(issuer);
        createCredentialPojoArgs.setExpirationDate(System.currentTimeMillis() + 1000 * 60 * 60 * 24 * 100);

        WeIdAuthentication weIdAuthentication = new WeIdAuthentication();
        weIdAuthentication.setWeId(issuer);

        WeIdPrivateKey weIdPrivateKey = new WeIdPrivateKey();
        weIdPrivateKey.setPrivateKey(privateKey);
        weIdAuthentication.setWeIdPrivateKey(weIdPrivateKey);

        weIdAuthentication.setWeIdPublicKeyId(issuer);
        createCredentialPojoArgs.setWeIdAuthentication(weIdAuthentication);

        createCredentialPojoArgs.setClaim(claimData);

        ResponseData<CredentialPojo> response = credentialPojoService.createCredential(createCredentialPojoArgs);
        CommonUtils commonUtils = new CommonUtils();
        commonUtils.writeObjectToFile(response.getResult(), 0);
        return response;
    }


    public ResponseData<Boolean> verifyCredential(String weid, int type) {
        CommonUtils commonUtils = new CommonUtils();
        CredentialPojo credentialPojo = commonUtils.readObjectFromFile(type);
        CredentialPojoService credentialPojoService = new CredentialPojoServiceImpl();
        ResponseData<Boolean> verifyRes = credentialPojoService.verify(weid, credentialPojo);
        return verifyRes;
    }


    public String convertObjToStr(Object o) {
        JSONObject jsonObject = new JSONObject();
        String str = jsonObject.toJSONString(o);
        return str;
    }

    public ResponseData<CredentialPojo> createSelectedCredential() {
        CommonUtils commonUtils = new CommonUtils();
        CredentialPojo credentialPojo = commonUtils.readObjectFromFile(0);
        CredentialPojoService credentialPojoService = new CredentialPojoServiceImpl();

        // 选择性披露
        ClaimPolicy claimPolicy = new ClaimPolicy();
        claimPolicy.setFieldsToBeDisclosed("{\"name\":0,\"gender\":1,\"birthday\":1,\"address\":0,\"identityNumber\":0}");
        ResponseData<CredentialPojo> selectiveResponse =
                credentialPojoService.createSelectiveCredential(credentialPojo, claimPolicy);
        commonUtils.writeObjectToFile(selectiveResponse.getResult(), 1);
        return selectiveResponse;
    }
}
