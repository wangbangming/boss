package com.boss.web.controller;

import com.boss.entity.vo.TbSysRole;
import com.boss.entity.vo.TbSysUser;
import com.boss.service.ITbSysRoleService;
import com.boss.service.ITbSysUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 配合自定义指令ensureUnique，在保存或更新时对某些字段的唯一性进行校验
 * @author WangBangMing
 *
 */
@Controller
@RequestMapping(value="/checkUnique")
public class CheckUniqueController {
	
	@Autowired
	ITbSysRoleService tbSysRoleService;
	@Autowired
	ITbSysUserService tbSysUserService;

	@RequestMapping(value="/roleCode", method=RequestMethod.POST)
	@ResponseBody
	public Unique checkUnique(@RequestBody TbSysRole role) {
		boolean unique = true;
		String roleCode = role.getRoleCode();
		
		if(role.getId() == null) {//新增
			if(tbSysRoleService.findTbSysRoleByRoleCode(roleCode) != null) {
				unique = false;
			}
		}else {//修改
			if(tbSysRoleService.findTbSysRoleByRoleCodeAndIdNot(roleCode, role.getId()) != null) {//不判断新增和修改，直接调这个方法判断也是可以的
				unique = false;
			}
		}
		return new Unique(unique);
	}
	
	@RequestMapping(value="/account", method=RequestMethod.POST)
	@ResponseBody
	public Unique checkUnique(@RequestBody TbSysUser user) {
		boolean unique = true;
		String account = user.getAccount();
		if(user.getId() == null) {//新增
			if(tbSysUserService.findTbSysUserByAccount(account) != null) {
				unique = false;
			}
		}else {//修改
			if(tbSysUserService.findTbSysUserByAccountAndIdNot(account, user.getId()) != null) {
				unique = false;
			}
		}
		return new Unique(unique);
	}
	
	class Unique {
		private boolean unique;
		public boolean isUnique() {
			return unique;
		}
		public void setUnique(boolean unique) {
			this.unique = unique;
		}
		public Unique(boolean unique) {
			super();
			this.unique = unique;
		}
		
	}
}
