package com.boss.service;

import com.boss.entity.vo.TbSysRole;

import java.util.List;

/**
 * @author WangBangMing
 * @create 2017/11/3 13:36
 */
public interface ITbSysRoleService {
    List<TbSysRole> findTbSysRolesByUrlPattern(String urlPattern);

    List<TbSysRole> findTbSysRolesByUserAccount(String account);

    List<TbSysRole> findTbSysRolesByUserAccountExclude(String account);

    TbSysRole findTbSysRoleByRoleCode(String roleCode);

    List<TbSysRole> findAllTbSysRoles();

    TbSysRole findTbSysRoleByRoleCodeAndIdNot(String roleCode, Long id);//验证roleCode唯一性

    List<TbSysRole> findTbSysRolesByCondition(Integer currentPage, Integer currentPageSize, String roleCodeFilter, String roleNameFilter, String roleCodeSort, String roleNameSort);

    Long getCountByCondition(String roleCodeFilter, String roleNameFilter);

    TbSysRole getViaBatis(Long id);

    void deleteLogic(TbSysRole tbSysRole);

    TbSysRole save(TbSysRole role);
}
