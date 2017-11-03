package com.boss.dao;

import com.boss.entity.vo.TbSidebarMenu;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface TbSidebarMenuMapper {
    int deleteByPrimaryKey(Long id);

    int insert(TbSidebarMenu record);

    int insertSelective(TbSidebarMenu record);

    TbSidebarMenu selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(TbSidebarMenu record);

    int updateByPrimaryKey(TbSidebarMenu record);

    List<TbSidebarMenu> findTbSidebarMenuListByRoleId(@Param("roleId") Long roleId);

    List<TbSidebarMenu> findTbSidebarMenuListByParentIdUsingAuthority(@Param("parentId")Long parentId, @Param("account")String account);

    TbSidebarMenu findRootNode();

    List<TbSidebarMenu> findTbSidebarMenuListByParentId(@Param("parentId")Long parentId);

    TbSidebarMenu findTbSidebarMenuByMenuText(@Param("menuText")String menuText);
}