package com.boss.service.impl;

import com.boss.dao.TrSysUserRoleMapper;
import com.boss.entity.vo.TrSysUserRole;
import com.boss.service.ITrSysUserRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

/**
 * @author WangBangMing
 * @create 2017/11/3 13:42
 */
@Service
public class TrSysUserRoleServiceImpl implements ITrSysUserRoleService {

    @Autowired
    private TrSysUserRoleMapper trSysUserRoleDao;

    @Override
    public TrSysUserRole findTrSysUserRoleByUserIdAndRoleId(Long userId, Long roleId) {
        return trSysUserRoleDao.findTrSysUserRoleByUserIdAndRoleId(userId, roleId);
    }

    @Override
    public TrSysUserRole save(TrSysUserRole trSysUserRole) {
        if(null == trSysUserRole.getId()){
            trSysUserRole.setId(1L);
            trSysUserRole.setCreateDate(new Date());
            trSysUserRole.setRowVersion(1);
            trSysUserRoleDao.insert(trSysUserRole);
        }else{
            trSysUserRoleDao.updateByPrimaryKey(trSysUserRole);
        }
        return trSysUserRole;
    }

    @Override
    public void deleteLogic(TrSysUserRole trSysUserRole) {
        trSysUserRoleDao.deleteLogic(trSysUserRole.getId());
    }
}
