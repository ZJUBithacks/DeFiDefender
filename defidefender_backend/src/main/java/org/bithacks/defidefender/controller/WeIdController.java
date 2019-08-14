package org.bithacks.defidefender.controller;

import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.databind.JsonNode;
import com.github.fge.jackson.JsonLoader;
import com.webank.weid.constant.ErrorCode;
import com.webank.weid.protocol.base.CptBaseInfo;
import com.webank.weid.protocol.base.Credential;
import com.webank.weid.protocol.base.CredentialPojo;
import com.webank.weid.protocol.base.CredentialWrapper;
import com.webank.weid.protocol.response.CreateWeIdDataResult;
import com.webank.weid.protocol.response.ResponseData;
import com.webank.weid.util.DataToolUtils;
import org.apache.commons.lang3.StringUtils;
import org.bithacks.defidefender.service.DIDService;
import org.bithacks.defidefender.utils.*;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
public class WeIdController {
    DIDService weIdService = new DIDService();

    private static final String KEY_DIR = PropertiesUtils.getProperty("weid.keys.dir");

    @RequestMapping(value = "/weid/createDID", method = RequestMethod.POST)
    public SuperResult createWeId() {
        System.out.println("Create DID Request");
        ResponseData<CreateWeIdDataResult> response = weIdService.createWeIdWithSetAttr();
        if (response.getErrorCode().intValue() == ErrorCode.SUCCESS.getCode()) {
            PrivateKeyUtil.savePrivateKey(
                    KEY_DIR,
                    response.getResult().getWeId(),
                    response.getResult().getUserWeIdPrivateKey().getPrivateKey()
            );
        }
        response.getResult().setUserWeIdPrivateKey(null);
        return SuperResult.ok(response);
    }

    @RequestMapping(value = "/weid/registerAuthorityIssuer", method = RequestMethod.POST)
    public SuperResult registerAuthorityIssuer(@RequestBody String jsonStr) {
        System.out.println("registerAuthorityIssuer Request");
        ResponseData<Boolean> response = null;
        try {
            JsonNode jsonNode = JsonLoader.fromString(jsonStr);
            String issuer = "", authorityName = "";
            JsonNode issuerNode = jsonNode.get("issuer");
            if (issuerNode != null) {
                issuer = issuerNode.textValue();
            }
            JsonNode authorityNameNode = jsonNode.get("authorityName");
            if (authorityNameNode != null) {
                authorityName = authorityNameNode.textValue();
            }
            response = weIdService.registerAuthorityIssuer(issuer, authorityName);
        } catch (Exception e) {
            return SuperResult.fail();
        }
        return SuperResult.ok(response);
    }

    @RequestMapping(value = "/weid/registerIssuerType", method = RequestMethod.POST)
    public SuperResult registerIssuerType(@RequestBody String jsonStr) {
        ResponseData<Boolean> response = null;
        try {
            JsonNode jsonNode = JsonLoader.fromString(jsonStr);
            String issuer = jsonNode.get("issuer").textValue();
            String authorityName = jsonNode.get("authorityName").textValue();
            ResponseData<Boolean> responseData = weIdService.registerIssuerType(issuer, authorityName);
            return SuperResult.ok(responseData);
        } catch (Exception e) {
            return SuperResult.fail();
        }
    }

    @RequestMapping(value = "/weid/registerCpt", method = RequestMethod.POST)
    public SuperResult registerCPT(@RequestBody String jsonStr) {
        System.out.println("registerCpt Request");
        ResponseData<CptBaseInfo> response = null;
        try {
            JsonNode jsonNode = JsonLoader.fromString(jsonStr);
            JsonNode publisherNode = jsonNode.get("publisher");
            String publisher = "";
            if (publisherNode != null) {
                publisher = publisherNode.textValue();
                String privateKey = PrivateKeyUtil.getPrivateKeyByWeId(KEY_DIR, publisher);
                HashMap<String, Object> jsonSchema = CommonUtils.buildCptJsonSchema();
                response = weIdService.registCpt(publisher, privateKey, jsonSchema);
            }
        } catch (Exception e) {
            return null;
        }
        return SuperResult.ok(response);
    }

    @RequestMapping(value = "/weid/createCredential", method = RequestMethod.POST)
    public SuperResult createCredential(@RequestBody String jsonStr) {
        System.out.println("createCredential Request");
        ResponseData<CredentialPojo> response = null;
        try {
            // converting request data in JSON format into JsonNode.
            JsonNode jsonNode = JsonLoader.fromString(jsonStr);

            // getting cptId data.
            JsonNode cptIdNode = jsonNode.get("cptId");
            Integer cptId = null;
            if (cptIdNode != null && StringUtils.isNotBlank(cptIdNode.textValue())) {
                cptId = Integer.parseInt(cptIdNode.textValue());
            }

            // getting issuer data.
            JsonNode issuerNode = jsonNode.get("issuer");
            String issuer = null;
            if (issuerNode != null) {
                issuer = issuerNode.textValue();
            }

            // getting claimData data.
            JsonNode claimDataNode = jsonNode.get("claimData");
            String claimData = null;
            if (claimDataNode != null) {
                claimData = claimDataNode.toString();
            }

            // converting claimData in JSON format to map.
            Map<String, Object> claimDataMap = new HashMap<String, Object>();
            claimDataMap =
                    (Map<String, Object>) DataToolUtils.deserialize(
                            claimData,
                            claimDataMap.getClass()
                    );

            // get the private key from the file according to weId.
            String privateKey = PrivateKeyUtil.getPrivateKeyByWeId(KEY_DIR, issuer);
            response = weIdService.createCredential(cptId, issuer, privateKey, claimDataMap);
        } catch (IOException e) {
            response = new ResponseData<CredentialPojo>(null, ErrorCode.CREDENTIAL_ERROR);
        }
        return SuperResult.ok(response);
    }

    @RequestMapping(value = "/weid/verifyCredential", method = RequestMethod.POST)
    public SuperResult verifyCredential(@RequestBody String jsonStr) {
        System.out.println("verifyCredential Request");
        try {
            JsonNode jsonNode = JsonLoader.fromString(jsonStr);
            String weid = jsonNode.get("weid").textValue();
            int type = Integer.parseInt(jsonNode.get("type").textValue());
            ResponseData<Boolean> response = weIdService.verifyCredential(weid, type);
            return SuperResult.ok(response);
        } catch (Exception e) {
            return SuperResult.fail();
        }
    }


    @RequestMapping(value = "/weid/createSelectedCredential", method = RequestMethod.POST)
    public SuperResult createSelectedCredential() {
        ResponseData<CredentialPojo> response = weIdService.createSelectedCredential();
        return SuperResult.ok(response);
    }


}
