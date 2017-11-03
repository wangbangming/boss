package com.boss.web.controller;

import com.boss.entity.vo.TbSysRole;
import com.boss.service.ITbSysRoleService;
import com.boss.web.message.ErrorMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;


/**
 * 配合angularjs自定义directive:checkButtonAuth，由传入的url动态决定按钮是否显示
 * @author WangBangMing
 *
 */
@Controller
@RequestMapping(value="/checkauth")
public class CheckAuthController {
	
	@Autowired
	private ITbSysRoleService tbSysRoleService;

	@RequestMapping(value="/button", method=RequestMethod.GET)
	@ResponseBody
	public ErrorMessage checkButtonAuth(@RequestParam String url) {
		String message = "not authorized";
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		if (principal instanceof UserDetails) {
			String username = ((UserDetails) principal).getUsername();
			//username所拥有的角色列表
			List<TbSysRole> tbSysRoleList1 = tbSysRoleService.findTbSysRolesByUserAccount(username);
			//访问资源所需要的角色列表
			List<TbSysRole> tbSysRoleList2= tbSysRoleService.findTbSysRolesByUrlPattern(url);
			//检查有无交集
			boolean b = checkIntersection(tbSysRoleList1, tbSysRoleList2);
			if(b == true) {
				message = "authorized";
			}
		}
		return new ErrorMessage(message);
	}
	
	private boolean checkIntersection(List<TbSysRole> tbSysRoleList1, List<TbSysRole> tbSysRoleList2) {
		for(TbSysRole r1 : tbSysRoleList1) {
			for(TbSysRole r2 : tbSysRoleList2) {
				if(r1.getRoleCode().equals(r2.getRoleCode())) {
					return true;
				}
			}
		}
		return false;
	}
	
}
