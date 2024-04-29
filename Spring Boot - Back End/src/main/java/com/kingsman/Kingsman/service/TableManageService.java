package com.kingsman.Kingsman.service;

import com.kingsman.Kingsman.model.TableManage;
import com.kingsman.Kingsman.repository.TableManageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TableManageService {
    @Autowired
    TableManageRepository tableManageRepository;
    public void addTable(TableManage table){
        tableManageRepository.save(table);

    }

    // Method to retrieve all tables
    public List<TableManage> getAllTables() {
        return tableManageRepository.findAll();
    }

    // Method to delete tables by id
    public void deleteTableById(Long id){
        tableManageRepository.deleteById(id);
    }
}
