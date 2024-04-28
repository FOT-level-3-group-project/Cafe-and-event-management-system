package com.kingsman.Kingsman.service;

import com.kingsman.Kingsman.model.TableManage;
import com.kingsman.Kingsman.repository.TableManageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TableManageService {
    @Autowired
    TableManageRepository tableManageRepository;
    public void addTable(TableManage table){
        tableManageRepository.save(table);

    }
}
