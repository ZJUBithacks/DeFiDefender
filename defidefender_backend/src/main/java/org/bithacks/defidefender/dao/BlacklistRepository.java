package org.bithacks.defidefender.dao;

import org.bithacks.defidefender.model.Po.Blacklist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BlacklistRepository extends JpaRepository<Blacklist, Long> {
    List<Blacklist> findBlackListsByWeid(String weid);
}
