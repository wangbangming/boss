package com.boss.web.controller;

import com.boss.entity.vo.TbSysRole;
import com.boss.entity.vo.TbSysUser;
import com.boss.entity.vo.TrSysUserRole;
import com.boss.service.ITbSysRoleService;
import com.boss.service.ITbSysUserService;
import com.boss.service.ITrSysUserRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.encoding.Md5PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * @author WangBangMing
 */
@Controller
@RequestMapping(value = "/user")
public class UserController {

    @Autowired
    ITbSysUserService tbSysUserService;
    @Autowired
    ITbSysRoleService tbSysRoleService;
    @Autowired
    ITrSysUserRoleService trSysUserRoleService;

    @RequestMapping(value = "/queryAll", method = RequestMethod.GET)
    @ResponseBody
    public List<TbSysUser> queryAll() {
        return tbSysUserService.findAllTbSysUsers();
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    @ResponseBody
    public void save(@RequestBody TbSysUser user) {
        String password = user.getPassword();
        password = new Md5PasswordEncoder().encodePassword(password, null);
        user.setPassword(password);
        tbSysUserService.save(user);
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    @ResponseBody
    public void update(@RequestBody TbSysUser user) {
        tbSysUserService.save(user);
    }

    @RequestMapping(value = "/remove", method = RequestMethod.DELETE)
    @ResponseBody
    public void delete(@RequestParam Long id) {
        TbSysUser tbSysUser = tbSysUserService.getViaBatis(id);
        tbSysUserService.deleteLogic(tbSysUser);
    }

    @RequestMapping(value = "/queryUserRoles", method = RequestMethod.GET)
    @ResponseBody
    public List<TbSysRole> queryUserRoles(@RequestParam Long userId) {
        TbSysUser tbSysUser = tbSysUserService.getViaBatis(userId);
        return tbSysRoleService.findTbSysRolesByUserAccount(tbSysUser.getAccount());
    }

    @RequestMapping(value = "/queryUserRolesExclude", method = RequestMethod.GET)
    @ResponseBody
    public List<TbSysRole> queryUserRolesExclude(@RequestParam Long userId) {
        TbSysUser tbSysUser = tbSysUserService.getViaBatis(userId);
        return tbSysRoleService.findTbSysRolesByUserAccountExclude(tbSysUser.getAccount());
    }

    @RequestMapping(value = "/handleRoles", method = RequestMethod.POST)
    @ResponseBody
    public void handleRoles(@RequestParam Long userId, @RequestParam String selectedRoles) {
        TbSysUser tbSysUser = tbSysUserService.getViaBatis(userId);

        //拿到选中用户已经拥有的角色列表
        List<TbSysRole> roleListOld = tbSysRoleService.findTbSysRolesByUserAccount(tbSysUser.getAccount());

        if ("".equals(selectedRoles)) {//选择的角色列表为空，可能是原来就没有角色，也可能是要求删除角色
            //原来就没有角色
            if (roleListOld.size() == 0) {
                return;
            } else {
                //原来有角色，要求删除角色
                for (TbSysRole tbSysRole : roleListOld) {
                    TrSysUserRole trSysUserRole = trSysUserRoleService
                            .findTrSysUserRoleByUserIdAndRoleId(userId, tbSysRole.getId());
                    trSysUserRoleService.deleteLogic(trSysUserRole);
                }
            }
        } else {
            List<TbSysRole> roleListSelected = new ArrayList<TbSysRole>();//选中的角色列表
            for (int i = 0; i < selectedRoles.split(",").length; i++) {
                String roleCode = selectedRoles.split(",")[i];
                TbSysRole tbSysRole = tbSysRoleService.findTbSysRoleByRoleCode(roleCode);
                roleListSelected.add(tbSysRole);
            }

            handle(userId, roleListOld, roleListSelected);
        }
    }

    private void handle(Long userId, List<TbSysRole> roleListOld, List<TbSysRole> roleListSelected) {
        //删除老用户角色关系
        for (TbSysRole tbSysRole : roleListOld) {
            TrSysUserRole trSysUserRole = trSysUserRoleService
                    .findTrSysUserRoleByUserIdAndRoleId(userId, tbSysRole.getId());
            trSysUserRoleService.deleteLogic(trSysUserRole);
        }
        //插入新用户角色关系
        for (TbSysRole tbSysRole : roleListSelected) {
            TrSysUserRole trSysUserRole = new TrSysUserRole();
            trSysUserRole.setUserId(userId);
            trSysUserRole.setRoleId(tbSysRole.getId());
            trSysUserRoleService.save(trSysUserRole);
        }
    }

}
