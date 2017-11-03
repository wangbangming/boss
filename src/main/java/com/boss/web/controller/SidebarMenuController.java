package com.boss.web.controller;

import com.boss.entity.vo.TbSidebarMenu;
import com.boss.service.ITbSidebarMenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;


/**
 * 配合angularjs自定义directive:sidebarMenuTree，根据当前登录用户自动加载左侧权限菜单
 * @author WangBangMing
 *
 */
@Controller
public class SidebarMenuController {

	@Autowired
	ITbSidebarMenuService tbSidebarMenuService;

	@RequestMapping(value = "/menu/getAll", method = RequestMethod.GET)
	@ResponseBody
	public TbSidebarMenu getAll() {
		return tbSidebarMenuService.buildTree();
	}

	@RequestMapping(value = "/menu/getAllByAuthority", method = RequestMethod.GET)
	@ResponseBody
	public TbSidebarMenu getAllByAuthority() {
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		if (principal instanceof UserDetails) {
			String username = ((UserDetails) principal).getUsername();
			/*Iterator it = ((UserDetails) principal).getAuthorities().iterator();
			String authority = "";
			while (it.hasNext()) {
				authority = ((GrantedAuthority) it.next()).getAuthority();
				System.out.println("role_code:" + authority);
			}*/
			return tbSidebarMenuService.buildTreeUsingAuthority(username);
		}
		return null;//anonymoususer将看不到菜单
	}
}
