package com.boss.service.impl;

import com.boss.dao.TbSupplierMapper;
import com.boss.entity.vo.TbSupplier;
import com.boss.service.ITbSupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

/**
 * @author WangBangMing
 * @create 2017/11/3 13:40
 */
@Service
public class TbSupplierServiceImpl implements ITbSupplierService {

    @Autowired
    private TbSupplierMapper tbSupplierDao;

    @Override
    public List<TbSupplier> findAllTbSuppliers() {
        return tbSupplierDao.findAll();
    }

    @Override
    public TbSupplier getViaBatis(Long id) {
        return tbSupplierDao.selectByPrimaryKey(id);
    }

    @Override
    public void deleteLogic(TbSupplier tbSupplier) {
        tbSupplierDao.deleteLogic(tbSupplier.getId());
    }

    @Override
    public TbSupplier save(TbSupplier tbSupplier) {
        if(null == tbSupplier.getId()){
            tbSupplier.setCreateDate(new Date());
            tbSupplier.setId(1L);
            tbSupplier.setRowVersion(1);
            tbSupplierDao.insert(tbSupplier);
        }else{
            tbSupplierDao.updateByPrimaryKey(tbSupplier);
        }
        return tbSupplier;
    }
}
