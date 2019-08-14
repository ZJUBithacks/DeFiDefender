package org.bithacks.defidefender.controller;

import com.webank.weid.protocol.base.CptBaseInfo;
import com.webank.weid.protocol.base.Credential;
import com.webank.weid.protocol.base.WeIdDocument;
import com.webank.weid.protocol.response.CreateWeIdDataResult;
import com.webank.weid.rpc.WeIdService;
import com.webank.weid.service.impl.WeIdServiceImpl;
import org.bithacks.defidefender.dao.ContractRepository;
import org.bithacks.defidefender.model.Po.Contract;
import org.bithacks.defidefender.service.DIDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class HelloController {

    @Autowired
    ContractRepository contractRepository;

    DIDService weIdService = new DIDService();

    @RequestMapping(value = "/createContract")
    public String createContract() {
        contractRepository.save(new Contract("weid", "111111111"));
        List<Contract> contracts = contractRepository.findAll();
        for (Contract contract : contracts) {
            System.out.println(contract.getName() + ":" + contract.getAddress());
        }
        return "Create Success";
    }

    @RequestMapping(value = "/findByName")
    public String findByName() {
        Contract contract = contractRepository.findByName("weid");
        return contract.getAddress();
    }

    @RequestMapping(value = "/")
    public String hello() {
        return "Success";
    }

}
