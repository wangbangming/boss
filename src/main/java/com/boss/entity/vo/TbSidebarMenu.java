package com.boss.entity.vo;

import java.util.List;

public class TbSidebarMenu extends BaseEntity {
    private Long id;

    private String uiSref;

    private String iClass;

    private Long parentId;

    private String menuText;

    private Boolean isLeaf;

    private List<TbSidebarMenu> sidebarMenuList;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUiSref() {
        return uiSref;
    }

    public void setUiSref(String uiSref) {
        this.uiSref = uiSref == null ? null : uiSref.trim();
    }

    public String getiClass() {
        return iClass;
    }

    public void setiClass(String iClass) {
        this.iClass = iClass == null ? null : iClass.trim();
    }

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    public String getMenuText() {
        return menuText;
    }

    public void setMenuText(String menuText) {
        this.menuText = menuText == null ? null : menuText.trim();
    }

    public Boolean getIsLeaf() {
        return isLeaf;
    }

    public void setIsLeaf(Boolean isLeaf) {
        this.isLeaf = isLeaf;
    }

    public List<TbSidebarMenu> getSidebarMenuList() {
        return sidebarMenuList;
    }

    public void setSidebarMenuList(List<TbSidebarMenu> sidebarMenuList) {
        this.sidebarMenuList = sidebarMenuList;
    }
}