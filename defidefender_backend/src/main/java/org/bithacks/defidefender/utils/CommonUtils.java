package org.bithacks.defidefender.utils;

import com.alibaba.fastjson.JSONObject;
import com.webank.weid.constant.JsonSchemaConstant;
import com.webank.weid.protocol.base.CredentialPojo;

import java.io.*;
import java.util.HashMap;

public class CommonUtils {

    public static HashMap<String, Object> buildCptJsonSchema() {

        HashMap<String, Object> cptJsonSchemaNew = new HashMap<String, Object>(3);
        cptJsonSchemaNew.put(JsonSchemaConstant.TITLE_KEY, "Government CPT");
        cptJsonSchemaNew.put(JsonSchemaConstant.DESCRIPTION_KEY, "this is CPT issued by government");

        HashMap<String, Object> propertitesMap1 = new HashMap<String, Object>(2);
        propertitesMap1.put(JsonSchemaConstant.TYPE_KEY, JsonSchemaConstant.DATA_TYPE_STRING);
        propertitesMap1.put(JsonSchemaConstant.DESCRIPTION_KEY, "this is name");

        String[] genderEnum = {"F", "M"};
        HashMap<String, Object> propertitesMap2 = new HashMap<String, Object>(2);
        propertitesMap2.put(JsonSchemaConstant.TYPE_KEY, JsonSchemaConstant.DATA_TYPE_STRING);
        propertitesMap2.put(JsonSchemaConstant.DATA_TYPE_ENUM, genderEnum);

        HashMap<String, Object> propertitesMap3 = new HashMap<String, Object>(2);
        propertitesMap3.put(JsonSchemaConstant.TYPE_KEY, JsonSchemaConstant.DATA_TYPE_STRING);
        propertitesMap3.put(JsonSchemaConstant.DESCRIPTION_KEY, "this is birthday");

        HashMap<String, Object> propertitesMap4 = new HashMap<String, Object>(2);
        propertitesMap4.put(JsonSchemaConstant.TYPE_KEY, JsonSchemaConstant.DATA_TYPE_STRING);
        propertitesMap4.put(JsonSchemaConstant.DESCRIPTION_KEY, "this is address");

        HashMap<String, Object> propertitesMap5 = new HashMap<String, Object>(2);
        propertitesMap5.put(JsonSchemaConstant.TYPE_KEY, JsonSchemaConstant.DATA_TYPE_STRING);
        propertitesMap5.put(JsonSchemaConstant.DESCRIPTION_KEY, "this is identityNumber");

        HashMap<String, Object> propertitesMap6 = new HashMap<String, Object>(2);
        propertitesMap6.put(JsonSchemaConstant.TYPE_KEY, JsonSchemaConstant.DATA_TYPE_STRING);
        propertitesMap6.put(JsonSchemaConstant.DESCRIPTION_KEY, "this is weid");

        HashMap<String, Object> cptJsonSchema = new HashMap<String, Object>(3);
        cptJsonSchema.put("name", propertitesMap1);
        cptJsonSchema.put("gender", propertitesMap2);
        cptJsonSchema.put("birthday", propertitesMap3);
        cptJsonSchema.put("address", propertitesMap4);
        cptJsonSchema.put("identityNumber", propertitesMap5);
        cptJsonSchema.put("weid", propertitesMap6);

        cptJsonSchemaNew.put(JsonSchemaConstant.PROPERTIES_KEY, cptJsonSchema);

        String[] genderRequired = {"name", "gender", "birthday", "address", "identityNumber"};
        cptJsonSchemaNew.put(JsonSchemaConstant.REQUIRED_KEY, genderRequired);

        return cptJsonSchemaNew;
    }


    public void writeObjectToFile(CredentialPojo obj, int type) {
        File file = new File(type == 0 ? "credential.dat" : "selectiveCredential.dat");
        FileOutputStream out;
        try {
            out = new FileOutputStream(file);
            ObjectOutputStream objOut = new ObjectOutputStream(out);
            objOut.writeObject(obj);
            objOut.flush();
            objOut.close();
            System.out.println("write object success!");
        } catch (IOException e) {
            System.out.println("write object failed");
            e.printStackTrace();
        }
    }

    public CredentialPojo readObjectFromFile(int type) {
        CredentialPojo temp = null;
        File file = new File(type == 0 ? "credential.dat" : "selectiveCredential.dat");
        FileInputStream in;
        try {
            in = new FileInputStream(file);
            ObjectInputStream objIn = new ObjectInputStream(in);
            temp = (CredentialPojo) objIn.readObject();
            objIn.close();
            System.out.println("read object success!");
        } catch (IOException e) {
            System.out.println("read object failed");
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        return temp;
    }

}
