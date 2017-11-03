package com.boss.dao;

import com.boss.entity.vo.TbSysUser;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface TbSysUserMapper {
    int deleteByPrimaryKey(Long id);

    int insert(TbSysUser record);

    int insertSelective(TbSysUser record);

    TbSysUser selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(TbSysUser record);

    int updateByPrimaryKey(TbSysUser record);

    TbSysUser findTbSysUserByAccount(@Param("account")String account);

    List<TbSysUser> findAllActive();

    TbSysUser findTbSysUserByAccountAndIdNot(@Param("account")String account, @Param("id")Long id);

    void deleteLogic(@Param("id") Long id);
}