package com.boss.service;

import com.boss.entity.vo.TrSysUserRole;

/**
 * @author WangBangMing
 * @create 2017/11/3 13:38
 */
public interface ITrSysUserRoleService {
    TrSysUserRole findTrSysUserRoleByUserIdAndRoleId(Long userId, Long roleId);

    TrSysUserRole save(TrSysUserRole trSysUserRole);

    void deleteLogic(TrSysUserRole trSysUserRole);
}
