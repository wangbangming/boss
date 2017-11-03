package com.boss.service.impl;

import com.boss.dao.TrSysRoleMenuMapper;
import com.boss.entity.vo.TrSysRoleMenu;
import com.boss.service.ITrSysRoleMenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

/**
 * @author WangBangMing
 * @create 2017/11/3 13:42
 */
@Service
public class TrSysRoleMenuServiceImpl implements ITrSysRoleMenuService {

    @Autowired
    private TrSysRoleMenuMapper trSysRoleMenuDao;

    @Override
    public List<TrSysRoleMenu> findTrSysRoleMenuListByRoleId(Long roleId) {
        return trSysRoleMenuDao.findTrSysRoleMenuListByRoleId(roleId);
    }

    @Override
    public void deleteLogic(TrSysRoleMenu sysRoleMenu) {
        trSysRoleMenuDao.deleteLogic(sysRoleMenu.getId());
    }

    @Override
    public TrSysRoleMenu save(TrSysRoleMenu trSysRoleMenu) {
        if(null != trSysRoleMenu.getId()){
            trSysRoleMenuDao.updateByPrimaryKey(trSysRoleMenu);
        }else{
            trSysRoleMenu.setId(1L);
            trSysRoleMenu.setCreateDate(new Date());
            trSysRoleMenu.setRowVersion(1);
            trSysRoleMenuDao.insert(trSysRoleMenu);
        }
        return trSysRoleMenu;
    }
}
