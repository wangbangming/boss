package com.boss.service;

import com.boss.entity.vo.TbSidebarMenu;

import java.util.List;

/**
 * @author WangBangMing
 * @create 2017/11/3 13:33
 */
public interface ITbSidebarMenuService {
    List<TbSidebarMenu> findTbSidebarMenuListByParentId(Long parentId);
    TbSidebarMenu findTbSidebarMenuByMenuText(String menuText);
    TbSidebarMenu buildTree();
    TbSidebarMenu addChildNodes(TbSidebarMenu tbSidebarMenu);
    TbSidebarMenu findRootNode();
    List<TbSidebarMenu> findTbSidebarMenuListByParentIdUsingAuthority(Long parentId, String account);
    TbSidebarMenu buildTreeUsingAuthority(String account);
    TbSidebarMenu addChildNodesUsingAuthority(TbSidebarMenu tbSidebarMenu, String account);
    List<TbSidebarMenu> findTbSidebarMenuListByRoleId(Long roleId);
}
