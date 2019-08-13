package org.bithacks.defidefender.dao;

import org.bithacks.defidefender.model.Po.Contract;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContractRepository extends JpaRepository<Contract, String> {

    Contract findByName(String name);

}
