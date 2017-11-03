package com.boss.dao;

import com.boss.entity.vo.TrSysRoleMenu;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface TrSysRoleMenuMapper {
    int deleteByPrimaryKey(Long id);

    int insert(TrSysRoleMenu record);

    int insertSelective(TrSysRoleMenu record);

    TrSysRoleMenu selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(TrSysRoleMenu record);

    int updateByPrimaryKey(TrSysRoleMenu record);

    void deleteLogic(@Param("id") Long id);

    List<TrSysRoleMenu> findTrSysRoleMenuListByRoleId(@Param("roleId")Long roleId);
}