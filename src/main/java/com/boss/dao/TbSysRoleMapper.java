package com.boss.dao;

import com.boss.entity.vo.TbSysRole;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.HashMap;
import java.util.List;

@Mapper
public interface TbSysRoleMapper {
    int deleteByPrimaryKey(Long id);

    int insert(TbSysRole record);

    int insertSelective(TbSysRole record);

    TbSysRole selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(TbSysRole record);

    int updateByPrimaryKey(TbSysRole record);

    List<TbSysRole> findTbSysRolesByUrlPattern(@Param("urlPattern") String urlPattern);

    List<TbSysRole> findTbSysRolesByUserAccount(@Param("account")String account);

    List<TbSysRole> findTbSysRolesByUserAccountExclude(@Param("account")String account);

    TbSysRole findTbSysRoleByRoleCode(@Param("roleCode")String roleCode);

    List<TbSysRole> findAllActive();

    TbSysRole findTbSysRoleByRoleCodeAndIdNot(@Param("roleCode")String roleCode, @Param("id")Long id);

    List<TbSysRole> findTbSysRolesByCondition(HashMap<String, Object> hashMap);

    Long getCountByCondition(@Param("roleCodeFilter") String roleCodeFilter, @Param("roleNameFilter")String roleNameFilter);

    void deleteLogic(Long id);
}