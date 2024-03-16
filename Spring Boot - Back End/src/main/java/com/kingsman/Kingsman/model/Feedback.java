package com.kingsman.Kingsman.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Feedback {
    @GeneratedValue

    @Id
    private Long fid;
    private String name;
    private String feedback;
    private String rate;

    public Long getFid() {
        return fid;
    }

    public void setFid(Long fid) {
        this.fid = fid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    public String getRate() {
        return rate;
    }

    public void setRate(String rate) {
        this.rate = rate;
    }


}
