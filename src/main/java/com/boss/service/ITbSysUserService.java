package com.boss.service;

import com.boss.entity.vo.TbSysUser;

import java.util.List;

/**
 * @author WangBangMing
 * @create 2017/11/3 13:36
 */
public interface ITbSysUserService {
    TbSysUser findTbSysUserByAccount(String account);

    List<TbSysUser> findAllTbSysUsers();

    TbSysUser findTbSysUserByAccountAndIdNot(String account, Long id);//验证account唯一性

    TbSysUser getViaBatis(Long userId);

    TbSysUser save(TbSysUser user);

    void deleteLogic(TbSysUser tbSysUser);
}
