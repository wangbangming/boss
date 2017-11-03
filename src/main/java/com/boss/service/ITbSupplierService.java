package com.boss.service;

import com.boss.entity.vo.TbSupplier;

import java.util.List;

/**
 * @author WangBangMing
 * @create 2017/11/3 13:35
 */
public interface ITbSupplierService {
    List<TbSupplier> findAllTbSuppliers();

    TbSupplier getViaBatis(Long id);

    void deleteLogic(TbSupplier tbSupplier);

    TbSupplier save(TbSupplier tbSupplier);
}
