package org.bithacks.defidefender.model.Po;


import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Contract {

    @Id
    private String name;
    private String address;


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Contract() {
    }

    public Contract(String name, String address) {
        this.name = name;
        this.address = address;
    }
}
