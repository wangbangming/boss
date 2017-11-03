package com.boss.service.impl;

import com.boss.dao.TbSysRoleMapper;
import com.boss.entity.vo.TbSysRole;
import com.boss.service.ITbSysRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;

/**
 * @author WangBangMing
 * @create 2017/11/3 13:41
 */
@Service
public class TbSysRoleServiceImpl implements ITbSysRoleService {

    @Autowired
    private TbSysRoleMapper tbSysRoleDao;

    @Override
    public List<TbSysRole> findTbSysRolesByUrlPattern(String urlPattern) {
        return tbSysRoleDao.findTbSysRolesByUrlPattern(urlPattern);
    }

    @Override
    public List<TbSysRole> findTbSysRolesByUserAccount(String account) {
        return tbSysRoleDao.findTbSysRolesByUserAccount(account);
    }

    @Override
    public List<TbSysRole> findTbSysRolesByUserAccountExclude(String account) {
        return tbSysRoleDao.findTbSysRolesByUserAccountExclude(account);
    }

    @Override
    public TbSysRole findTbSysRoleByRoleCode(String roleCode) {
        return tbSysRoleDao.findTbSysRoleByRoleCode(roleCode);
    }

    @Override
    public List<TbSysRole> findAllTbSysRoles() {
        return tbSysRoleDao.findAllActive();
    }

    @Override
    public TbSysRole findTbSysRoleByRoleCodeAndIdNot(String roleCode, Long id) {
        return tbSysRoleDao.findTbSysRoleByRoleCodeAndIdNot(roleCode, id);
    }

    @Override
    public List<TbSysRole> findTbSysRolesByCondition(Integer currentPage, Integer currentPageSize, String roleCodeFilter, String roleNameFilter, String roleCodeSort, String roleNameSort) {
        HashMap<String, Object> hashMap = new HashMap<String, Object>();
        Integer offset = (currentPage - 1) * currentPageSize;
        hashMap.put("offset", offset);
        hashMap.put("currentPageSize", currentPageSize);
        hashMap.put("roleCodeFilter", roleCodeFilter);
        hashMap.put("roleNameFilter", roleNameFilter);
        hashMap.put("roleCodeSort", roleCodeSort);
        hashMap.put("roleNameSort", roleNameSort);
        return tbSysRoleDao.findTbSysRolesByCondition(hashMap);
    }

    @Override
    public Long getCountByCondition(String roleCodeFilter, String roleNameFilter) {
        return tbSysRoleDao.getCountByCondition(roleCodeFilter, roleNameFilter);
    }

    @Override
    public TbSysRole getViaBatis(Long id) {
        return tbSysRoleDao.selectByPrimaryKey(id);
    }

    @Override
    public void deleteLogic(TbSysRole tbSysRole) {
        tbSysRoleDao.deleteLogic(tbSysRole.getId());
    }

    @Override
    public TbSysRole save(TbSysRole role) {
        if(null == role.getId()){
            role.setCreateDate(new Date());
            role.setRowVersion(1);
            role.setId(1L);
            tbSysRoleDao.insert(role);
        }else{
            tbSysRoleDao.updateByPrimaryKey(role);
        }
        return role;
    }
}
