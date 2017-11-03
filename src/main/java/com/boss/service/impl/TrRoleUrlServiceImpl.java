package com.boss.service.impl;

import com.boss.dao.TrRoleUrlMapper;
import com.boss.dao.TrSysRoleMenuMapper;
import com.boss.entity.vo.TrRoleUrl;
import com.boss.service.ITrRoleUrlService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

/**
 * @author WangBangMing
 * @create 2017/11/3 13:42
 */
@Service
public class TrRoleUrlServiceImpl implements ITrRoleUrlService {
    @Autowired
    private TrRoleUrlMapper trRoleUrlDao;

    @Override
    public List<TrRoleUrl> findTrRoleUrlsByRoleId(Long roleId) {
        return trRoleUrlDao.findTrRoleUrlsByRoleId(roleId);
    }

    @Override
    public void deleteLogic(TrRoleUrl trRoleUrl) {
        trRoleUrlDao.deleteLogic(trRoleUrl.getId());
    }

    @Override
    public TrRoleUrl save(TrRoleUrl trRoleUrl) {
        if(null != trRoleUrl.getId()){
            trRoleUrlDao.updateByPrimaryKey(trRoleUrl);
        }else{
            trRoleUrl.setRowVersion(1);
            trRoleUrl.setId(1L);
            trRoleUrl.setCreateDate(new Date());
            trRoleUrlDao.insert(trRoleUrl);
        }
        return trRoleUrl;
    }
}
