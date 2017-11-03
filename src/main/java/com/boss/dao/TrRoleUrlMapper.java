package com.boss.dao;

import com.boss.entity.vo.TrRoleUrl;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface TrRoleUrlMapper {
    int deleteByPrimaryKey(Long id);

    int insert(TrRoleUrl record);

    int insertSelective(TrRoleUrl record);

    TrRoleUrl selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(TrRoleUrl record);

    int updateByPrimaryKey(TrRoleUrl record);

    void deleteLogic(@Param("id")Long id);

    List<TrRoleUrl> findTrRoleUrlsByRoleId(@Param("roleId") Long roleId);
}