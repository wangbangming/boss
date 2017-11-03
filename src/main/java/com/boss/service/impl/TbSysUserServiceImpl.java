package com.boss.service.impl;

import com.boss.dao.TbSysUserMapper;
import com.boss.entity.vo.TbSysUser;
import com.boss.service.ITbSysUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

/**
 * @author WangBangMing
 * @create 2017/11/3 13:41
 */
@Service
public class TbSysUserServiceImpl implements ITbSysUserService {

    @Autowired
    private TbSysUserMapper tbSysUserDao;

    @Override
    public TbSysUser findTbSysUserByAccount(String account) {
        return tbSysUserDao.findTbSysUserByAccount(account);
    }

    @Override
    public List<TbSysUser> findAllTbSysUsers() {
        return tbSysUserDao.findAllActive();
    }

    @Override
    public TbSysUser findTbSysUserByAccountAndIdNot(String account, Long id) {
        return tbSysUserDao.findTbSysUserByAccountAndIdNot(account, id);
    }

    @Override
    public TbSysUser getViaBatis(Long userId) {
        return tbSysUserDao.selectByPrimaryKey(userId);
    }

    @Override
    public TbSysUser save(TbSysUser user) {
        if(null == user.getId()){
            user.setRowVersion(1);
            user.setId(1L);
            user.setCreateDate(new Date());
            tbSysUserDao.insert(user);
        }else{
            tbSysUserDao.updateByPrimaryKey(user);
        }
        return user;
    }

    @Override
    public void deleteLogic(TbSysUser tbSysUser) {
        tbSysUserDao.deleteLogic(tbSysUser.getId());
    }
}
