package com.boss.service.impl;

import com.boss.dao.TbSidebarMenuMapper;
import com.boss.entity.vo.TbSidebarMenu;
import com.boss.service.ITbSidebarMenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author WangBangMing
 * @create 2017/11/3 13:40
 */
@Service
public class TbSidebarMenuServiceImpl implements ITbSidebarMenuService {

    @Autowired
    private TbSidebarMenuMapper tbSidebarMenuDao;

    @Override
    public List<TbSidebarMenu> findTbSidebarMenuListByParentId(Long parentId) {
        return tbSidebarMenuDao.findTbSidebarMenuListByParentId(parentId);
    }

    @Override
    public TbSidebarMenu findTbSidebarMenuByMenuText(String menuText) {
        return tbSidebarMenuDao.findTbSidebarMenuByMenuText(menuText);
    }

    @Override
    public TbSidebarMenu buildTree() {
        TbSidebarMenu rootNode = findRootNode();
        return addChildNodes(rootNode);
    }

    @Override
    public TbSidebarMenu addChildNodes(TbSidebarMenu tbSidebarMenu) {
        List<TbSidebarMenu> list = findTbSidebarMenuListByParentId(tbSidebarMenu.getId());
        if(list.size() != 0) {
            tbSidebarMenu.setSidebarMenuList(list);
            for(TbSidebarMenu menu : list) {
                addChildNodes(menu);
            }
        }
        return tbSidebarMenu;
    }

    @Override
    public TbSidebarMenu findRootNode() {
        return tbSidebarMenuDao.findRootNode();
    }

    @Override
    public List<TbSidebarMenu> findTbSidebarMenuListByParentIdUsingAuthority(Long parentId, String account) {
        return tbSidebarMenuDao.findTbSidebarMenuListByParentIdUsingAuthority(parentId, account);
    }

    @Override
    public TbSidebarMenu buildTreeUsingAuthority(String account) {
        TbSidebarMenu tbSidebarMenu = findRootNode();
        addChildNodesUsingAuthority(tbSidebarMenu, account);
        return tbSidebarMenu;
    }

    @Override
    public TbSidebarMenu addChildNodesUsingAuthority(TbSidebarMenu tbSidebarMenu, String account) {
        List<TbSidebarMenu> list = findTbSidebarMenuListByParentIdUsingAuthority(tbSidebarMenu.getId(), account);
        if(list.size() != 0) {
            tbSidebarMenu.setSidebarMenuList(list);
            for(TbSidebarMenu menu : list) {
                addChildNodesUsingAuthority(menu, account);
            }
        }
        return tbSidebarMenu;
    }

    @Override
    public List<TbSidebarMenu> findTbSidebarMenuListByRoleId(Long roleId) {
        return tbSidebarMenuDao.findTbSidebarMenuListByRoleId(roleId);
    }
}
