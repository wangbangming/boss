package com.boss.dao;

import com.boss.entity.vo.TrSysUserRole;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface TrSysUserRoleMapper {
    int deleteByPrimaryKey(Long id);

    int insert(TrSysUserRole record);

    int insertSelective(TrSysUserRole record);

    TrSysUserRole selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(TrSysUserRole record);

    int updateByPrimaryKey(TrSysUserRole record);

    void deleteLogic(@Param("id")Long id);

    TrSysUserRole findTrSysUserRoleByUserIdAndRoleId(@Param("userId")Long userId, @Param("roleId")Long roleId);
}