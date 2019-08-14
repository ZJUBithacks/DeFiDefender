package org.bithacks.defidefender.service;

import org.bithacks.defidefender.dao.BlacklistRepository;
import org.bithacks.defidefender.model.Po.Blacklist;
import org.bithacks.defidefender.utils.SuperResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.List;

@Service
public class BlacklistService {

    @Autowired
    BlacklistRepository blacklistRepository;

    public SuperResult addBlacklist(String weid, String description) {
        Blacklist blackList = blacklistRepository.save(new Blacklist(weid, description));
        if (blackList == null) {
            return SuperResult.fail();
        }
        return SuperResult.ok();
    }

    public SuperResult findBlacklistByWeid(String weid) {
        List<Blacklist> list = blacklistRepository.findBlackListsByWeid(weid);
        return SuperResult.ok(list);
    }


    public SuperResult getBlacklist() {
        List<Blacklist> all = blacklistRepository.findAll();
        return SuperResult.ok(all);
    }

}
