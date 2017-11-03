package com.boss.dao;

import com.boss.entity.vo.TbSupplier;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface TbSupplierMapper {
    int deleteByPrimaryKey(Long id);

    int insert(TbSupplier record);

    int insertSelective(TbSupplier record);

    TbSupplier selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(TbSupplier record);

    int updateByPrimaryKey(TbSupplier record);

    List<TbSupplier> findAll();

    void deleteLogic(@Param("id") Long id);
}