package com.boss.web.controller;

import com.boss.web.message.ErrorMessage;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 此Controller用来处理被SpringSecurity拦截掉的异常url
 * @author WangBangMing
 *
 */
@Controller
public class NavigationController {

	/**
	 * 指向登录页面，没权限（ROLE_ANONYMOUS没有/index.html权限）未登陆
	 */
	@RequestMapping(value = "/auth/login", method = RequestMethod.GET)
	public String getLoginPage(
			@RequestParam(value = "error", required = false) boolean error,
			ModelMap model) {

		if (error == true) {
			// Assign an error message
			model.put("error",
					"You have entered an invalid username or password!");
		} else {
			model.put("error", "");
		}
		return "loginpage";

	}
	
	/**
	 * 指定无访问权限页面，但已登录
	 * 
	 * @return
	 */
	/*@RequestMapping(value = "/auth/denied", method = RequestMethod.GET)
	public String getDeniedPage() {
		return "deniedpage";
	}*/
	
	/**
	 * 由于前端ajax请求可能包括各种类型，当请求被spring security拦截到此处时，要求和前端ajax请求的类型一致。
	 * 所以此处需要提供多请求类型支持
	 * @return
	 */
	@RequestMapping(value = "/auth/denied", 
			method = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
	@ResponseBody
	public ErrorMessage getDeniedPage() {
		return new ErrorMessage("您所在的角色组无此权限");
	}
	
}
