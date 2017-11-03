package com.boss.service;

import com.boss.entity.vo.TrSysRoleMenu;

import java.util.List;

/**
 * @author WangBangMing
 * @create 2017/11/3 13:37
 */
public interface ITrSysRoleMenuService {
    List<TrSysRoleMenu> findTrSysRoleMenuListByRoleId(Long roleId);

    void deleteLogic(TrSysRoleMenu trSysRoleMenu);

    TrSysRoleMenu save(TrSysRoleMenu trSysRoleMenu);
}
