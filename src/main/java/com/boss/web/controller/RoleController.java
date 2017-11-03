package com.boss.web.controller;

import com.boss.entity.vo.TbSysRole;
import com.boss.service.ITbSysRoleService;
import com.boss.web.json.TotalCount;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author WangBangMing
 */
@Controller
@RequestMapping(value = "/role")
public class RoleController {

    @Autowired
    ITbSysRoleService tbSysRoleService;

    @RequestMapping(value = "/queryAll", method = RequestMethod.GET)
    @ResponseBody
    public List<TbSysRole> queryAll() {
        return tbSysRoleService.findAllTbSysRoles();
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    @ResponseBody
    public void save(@RequestBody TbSysRole role) {
        tbSysRoleService.save(role);
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    @ResponseBody
    public void update(@RequestBody TbSysRole role) {
        tbSysRoleService.save(role);
    }

    @RequestMapping(value = "/remove", method = RequestMethod.DELETE)
    @ResponseBody
    public void delete(@RequestParam Long id) {
        TbSysRole tbSysRole = tbSysRoleService.getViaBatis(id);
        tbSysRoleService.deleteLogic(tbSysRole);
    }

    //后台翻页时使用
    @RequestMapping(value = "/queryByCondition", method = RequestMethod.GET)
    @ResponseBody
    public List<TbSysRole> queryByCondition(
            @RequestParam Integer currentPage,
            @RequestParam Integer currentPageSize,
            @RequestParam String roleCodeFilter,
            @RequestParam String roleNameFilter,
            @RequestParam String roleCodeSort,
            @RequestParam String roleNameSort) {

        return tbSysRoleService.findTbSysRolesByCondition(currentPage, currentPageSize, roleCodeFilter, roleNameFilter, roleCodeSort, roleNameSort);
    }

    @RequestMapping(value = "/queryTotalItems", method = RequestMethod.GET)
    @ResponseBody
    public TotalCount queryTotalItems(@RequestParam String roleCodeFilter, @RequestParam String roleNameFilter) {
        Long count = tbSysRoleService.getCountByCondition(roleCodeFilter, roleNameFilter);
        return new TotalCount(count);
    }

}
