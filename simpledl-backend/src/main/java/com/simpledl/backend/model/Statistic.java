package com.simpledl.backend.model;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Statistic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    private Date extractStartTime;
    private Date extractEndTime;
    private Date importStartTime;
    private Date importEndTime;
    private Date indexStartTime;
    private Date indexEndTime;
    private Date generateStartTime;
    private Date generateEndTime;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getExtractStartTime() {
        return extractStartTime;
    }

    public void setExtractStartTime(Date extractStartTime) {
        this.extractStartTime = extractStartTime;
    }

    public Date getExtractEndTime() {
        return extractEndTime;
    }

    public void setExtractEndTime(Date extractEndTime) {
        this.extractEndTime = extractEndTime;
    }

    public Date getImportStartTime() {
        return importStartTime;
    }

    public void setImportStartTime(Date importStartTime) {
        this.importStartTime = importStartTime;
    }

    public Date getImportEndTime() {
        return importEndTime;
    }

    public void setImportEndTime(Date importEndTime) {
        this.importEndTime = importEndTime;
    }

    public Date getIndexStartTime() {
        return indexStartTime;
    }

    public void setIndexStartTime(Date indexStartTime) {
        this.indexStartTime = indexStartTime;
    }

    public Date getIndexEndTime() {
        return indexEndTime;
    }

    public void setIndexEndTime(Date indexEndTime) {
        this.indexEndTime = indexEndTime;
    }

    public Date getGenerateStartTime() {
        return generateStartTime;
    }

    public void setGenerateStartTime(Date generateStartTime) {
        this.generateStartTime = generateStartTime;
    }

    public Date getGenerateEndTime() {
        return generateEndTime;
    }

    public void setGenerateEndTime(Date generateEndTime) {
        this.generateEndTime = generateEndTime;
    }

    @Override
    public String toString() {
        return "Statistic{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", extractStartTime=" + extractStartTime +
                ", extractEndTime=" + extractEndTime +
                ", importStartTime=" + importStartTime +
                ", importEndTime=" + importEndTime +
                ", indexStartTime=" + indexStartTime +
                ", indexEndTime=" + indexEndTime +
                ", generateStartTime=" + generateStartTime +
                ", generateEndTime=" + generateEndTime +
                '}';
    }
}
