package com.boss.dao;

import com.boss.entity.vo.TbInterceptUrl;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface TbInterceptUrlMapper {
    int deleteByPrimaryKey(Long id);

    int insert(TbInterceptUrl record);

    int insertSelective(TbInterceptUrl record);

    TbInterceptUrl selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(TbInterceptUrl record);

    int updateByPrimaryKey(TbInterceptUrl record);

    List<TbInterceptUrl> findAllTbInterceptUrls();

    List<TbInterceptUrl> findTbInterceptUrlsByRoleId(@Param("roleId") Long roleId);
}