package com.boss.web.controller;

import com.boss.entity.vo.*;
import com.boss.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;

/**
 * 配合angularjs自定义directive:zTree和zTreeRadio，树形菜单组件
 *
 * @author WangBangMing
 */
@Controller
@RequestMapping("/zTree")
public class ZTreeController {

    @Autowired
    ITbSidebarMenuService tbSidebarMenuService;
    @Autowired
    ITbSysRoleService tbSysRoleService;
    @Autowired
    ITrSysRoleMenuService trSysRoleMenuService;
    @Autowired
    ITbInterceptUrlService tbInterceptUrlService;
    @Autowired
    ITrRoleUrlService trRoleUrlService;

    @RequestMapping(value = "/menu", method = RequestMethod.GET)
    @ResponseBody
    public List<ZTreeNode> getAllMenu() {
        return convertSidebarMenu2ZTreeNode();
    }

    private List<ZTreeNode> convertSidebarMenu2ZTreeNode() {//返回所有菜单对应的node，默认checked属性均为false
        List<TbSidebarMenu> tbSidebarMenuList = tbSidebarMenuService.buildTree().getSidebarMenuList();//所有菜单，树结构
        return process(tbSidebarMenuList);
    }

    private List<ZTreeNode> process(List<TbSidebarMenu> tbSidebarMenuList) {
        List<ZTreeNode> zTreeList = new ArrayList<ZTreeNode>();
        for (TbSidebarMenu tbSidebarMenu : tbSidebarMenuList) {
            ZTreeNode node = new ZTreeNode();
            node.setId(tbSidebarMenu.getId());
            node.setName(tbSidebarMenu.getMenuText());
            if (tbSidebarMenu.getSidebarMenuList() != null) {
                node.setChildren(process(tbSidebarMenu.getSidebarMenuList()));
            }
            zTreeList.add(node);
        }
        return zTreeList;
    }


    @RequestMapping(value = "/menuOnChecked", method = RequestMethod.GET)
    @ResponseBody
    public List<ZTreeNode> getAllMenuOnRoleSelected(@RequestParam Long linkId) {
        Long roleId = linkId;
        return convertSidebarMenu2ZTreeNode(roleId);
    }

    private List<ZTreeNode> convertSidebarMenu2ZTreeNode(Long roleId) {//返回所有菜单对应的node，此角色有的菜单对应的node的checked属性均为true，没有的为false
        List<TbSidebarMenu> tbSidebarMenuList = tbSidebarMenuService.buildTree().getSidebarMenuList();//所有菜单，树结构
        List<TbSidebarMenu> list = tbSidebarMenuService.findTbSidebarMenuListByRoleId(roleId);//当前角色有的菜单，非树结构
        return process(tbSidebarMenuList, list);
    }

    private List<ZTreeNode> process(List<TbSidebarMenu> tbSidebarMenuList, List<TbSidebarMenu> list) {
        List<ZTreeNode> zTreeList = new ArrayList<ZTreeNode>();
        for (TbSidebarMenu tbSidebarMenu : tbSidebarMenuList) {
            ZTreeNode node = new ZTreeNode();
            node.setId(tbSidebarMenu.getId());
            node.setName(tbSidebarMenu.getMenuText());
            if (tbSidebarMenu.getSidebarMenuList() != null) {
                node.setChildren(process(tbSidebarMenu.getSidebarMenuList(), list));
            }
            //处理checked属性
            for (TbSidebarMenu m : list) {
                if (tbSidebarMenu.getId().equals(m.getId())) {
                    node.setChecked(true);
                    break;
                }
            }

            zTreeList.add(node);
        }
        return zTreeList;
    }


    @RequestMapping(value = "/role", method = RequestMethod.GET)
    @ResponseBody
    public List<ZTreeNode> getAllRoles() {
        return convertRole2ZTreeNode();
    }

    private List<ZTreeNode> convertRole2ZTreeNode() {
        List<TbSysRole> tbSysRoleList = tbSysRoleService.findAllTbSysRoles();
        List<ZTreeNode> zTreeList = new ArrayList<ZTreeNode>();
        for (TbSysRole tbSysRole : tbSysRoleList) {
            ZTreeNode zTreeNode = new ZTreeNode();
            zTreeNode.setId(tbSysRole.getId());
            zTreeNode.setName(tbSysRole.getRoleName());
            zTreeList.add(zTreeNode);
        }
        return zTreeList;
    }

    @RequestMapping(value = "/authorizeMenu2Role", method = RequestMethod.POST)
    @ResponseBody
    public void authorizeMenu2Role(@RequestParam Long roleId, @RequestParam String menuIds) {
        String[] menuIdArray = menuIds.split(",");
        //此角色已经拥有的菜单关系
        List<TrSysRoleMenu> trSysRoleMenuList = trSysRoleMenuService.findTrSysRoleMenuListByRoleId(roleId);
        //删除已有关系
        for (TrSysRoleMenu trSysRoleMenu : trSysRoleMenuList) {
            trSysRoleMenuService.deleteLogic(trSysRoleMenu);
        }
        //加入新关系
        for (int i = 0; i < menuIdArray.length; i++) {
            Long menuId = Long.parseLong(menuIdArray[i]);
            TrSysRoleMenu trSysRoleMenu = new TrSysRoleMenu();
            trSysRoleMenu.setRoleId(roleId);
            trSysRoleMenu.setMenuId(menuId);
            trSysRoleMenuService.save(trSysRoleMenu);
        }
    }


    @RequestMapping(value = "/url", method = RequestMethod.GET)
    @ResponseBody
    public List<ZTreeNode> getAllInterceptUrls() {
        return convertInterceptUrl2ZTreeNode();
    }

    private List<ZTreeNode> convertInterceptUrl2ZTreeNode() {//返回所有URL对应的node，默认checked属性均为false
        List<TbInterceptUrl> tbInterceptUrlList = tbInterceptUrlService.findAllTbInterceptUrls();
        List<ZTreeNode> zTreeNodeList = new ArrayList<ZTreeNode>();
        for (TbInterceptUrl tbInterceptUrl : tbInterceptUrlList) {
            ZTreeNode zTreeNode = new ZTreeNode();
            zTreeNode.setChecked(false);//其实不设置，默认也为false
            zTreeNode.setId(tbInterceptUrl.getId());
            zTreeNode.setName(tbInterceptUrl.getUrlPattern());
            zTreeNodeList.add(zTreeNode);
        }
        return zTreeNodeList;
    }


    @RequestMapping(value = "/urlOnChecked", method = RequestMethod.GET)
    @ResponseBody
    public List<ZTreeNode> getAllInterceptUrlsOnRoleSelected(@RequestParam Long linkId) {
        Long roleId = linkId;
        return convertInterceptUrl2ZTreeNode(roleId);
    }

    private List<ZTreeNode> convertInterceptUrl2ZTreeNode(Long roleId) {//返回所有URL对应的node，此角色有的URL对应的node的checked属性均为true，没有的为false
        List<TbInterceptUrl> listByRoleId = tbInterceptUrlService.findTbInterceptUrlsByRoleId(roleId);
        List<TbInterceptUrl> listAll = tbInterceptUrlService.findAllTbInterceptUrls();
        List<ZTreeNode> zTreeNodeList = new ArrayList<ZTreeNode>();
        for (TbInterceptUrl tbInterceptUrl : listAll) {
            ZTreeNode zTreeNode = new ZTreeNode();
            zTreeNode.setChecked(false);//其实不设置，默认也为false
            zTreeNode.setId(tbInterceptUrl.getId());
            zTreeNode.setName(tbInterceptUrl.getUrlPattern());
            //处理checked属性
            for (TbInterceptUrl url : listByRoleId) {
                if (tbInterceptUrl.getId().equals(url.getId())) {
                    zTreeNode.setChecked(true);
                    break;
                }
            }

            zTreeNodeList.add(zTreeNode);
        }
        return zTreeNodeList;
    }

    @RequestMapping(value = "/authorizeUrl2Role", method = RequestMethod.POST)
    @ResponseBody
    public void authorizeUrl2Role(@RequestParam Long roleId, @RequestParam String urlIds) {
        String[] urlIdsArray = urlIds.split(",");
        //此角色已经拥有的URL列表
        List<TrRoleUrl> trRoleUrlList = trRoleUrlService.findTrRoleUrlsByRoleId(roleId);
        //删除老关系
        for (TrRoleUrl trRoleUrl : trRoleUrlList) {
            trRoleUrlService.deleteLogic(trRoleUrl);
        }
        //保存新关系
        for (int i = 0; i < urlIdsArray.length; i++) {
            Long urlId = Long.parseLong(urlIdsArray[i]);
            TrRoleUrl trRoleUrl = new TrRoleUrl();
            trRoleUrl.setRoleId(roleId);
            trRoleUrl.setUrlId(urlId);
            trRoleUrlService.save(trRoleUrl);
        }
    }

    class ZTreeNode {
        private Long id;
        private String name;
        List<ZTreeNode> children;
        boolean checked;

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public List<ZTreeNode> getChildren() {
            return children;
        }

        public void setChildren(List<ZTreeNode> children) {
            this.children = children;
        }

        public boolean isChecked() {
            return checked;
        }

        public void setChecked(boolean checked) {
            this.checked = checked;
        }

    }
}
