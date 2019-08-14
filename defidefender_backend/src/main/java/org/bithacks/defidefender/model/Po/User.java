package org.bithacks.defidefender.model.Po;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class User {

    @Id
    private String weid;
    private String name;
    private String gender;
    private String birthday;
    private String address;
    private String identityNumber;
    private String identityImgFront;
    private String identityImgBack;
    private int role;
    private int status;

    public User() {
    }

    public User(String weid, String name, String gender, String birthday, String address, String identityNumber, String identityImgFront, String identityImgBack, int role, int status) {
        this.weid = weid;
        this.name = name;
        this.gender = gender;
        this.birthday = birthday;
        this.address = address;
        this.identityNumber = identityNumber;
        this.identityImgFront = identityImgFront;
        this.identityImgBack = identityImgBack;
        this.role = role;
        this.status = status;
    }

    public String getIdentityNumber() {
        return identityNumber;
    }

    public void setIdentityNumber(String identityNumber) {
        this.identityNumber = identityNumber;
    }

    public String getWeid() {
        return weid;
    }

    public void setWeid(String weid) {
        this.weid = weid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getBirthday() {
        return birthday;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getIdentityImgFront() {
        return identityImgFront;
    }

    public void setIdentityImgFront(String identityImgFront) {
        this.identityImgFront = identityImgFront;
    }

    public String getIdentityImgBack() {
        return identityImgBack;
    }

    public void setIdentityImgBack(String identityImgBack) {
        this.identityImgBack = identityImgBack;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public int getRole() {
        return role;
    }

    public void setRole(int role) {
        this.role = role;
    }
}
