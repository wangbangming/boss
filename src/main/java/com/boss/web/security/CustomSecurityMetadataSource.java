package com.boss.web.security;

import com.boss.entity.vo.TbInterceptUrl;
import com.boss.entity.vo.TbSysRole;
import com.boss.service.ITbInterceptUrlService;
import com.boss.service.ITbSysRoleService;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.access.SecurityConfig;
import org.springframework.security.web.FilterInvocation;
import org.springframework.security.web.access.intercept.FilterInvocationSecurityMetadataSource;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;

import java.util.*;

/**
 * 系统启动加载系统权限 用户登入验证权限 该过滤器的主要作用就是通过IoC生成securityMetadataSource。
 * securityMetadataSource相当于本包中自定义的CustomInvocationSecurityMetadataSourceService
 * 。 该CustomInvocationSecurityMetadataSourceService的作用提从数据库提取权限和资源，装配到HashMap中，
 * 供Spring Security使用，用于权限校验。
 * 
 * @author WangBangMing
 */
public class CustomSecurityMetadataSource implements
		FilterInvocationSecurityMetadataSource {
	
	private ITbSysRoleService tbSysRoleService;
	private ITbInterceptUrlService tbInterceptUrlService;

	private static Map<String, Collection<ConfigAttribute>> resourceMap = null;
	private RequestMatcher pathMatcher;

	public CustomSecurityMetadataSource(ITbSysRoleService tbSysRoleService, ITbInterceptUrlService tbInterceptUrlService) {
		this.tbSysRoleService = tbSysRoleService;
		this.tbInterceptUrlService = tbInterceptUrlService;
		loadResourceDefine();
	}

	// 返回所请求资源所需要的权限
	//首页默认object是/index.html，不是/
	@Override
	public Collection<ConfigAttribute> getAttributes(Object object)
			throws IllegalArgumentException {
		Iterator<String> it = resourceMap.keySet().iterator();
		while (it.hasNext()) {
			String resURL = it.next();
			pathMatcher = new AntPathRequestMatcher(resURL);
			if (pathMatcher.matches(((FilterInvocation) object).getRequest())) {
				Collection<ConfigAttribute> returnCollection = resourceMap
						.get(resURL);
				return returnCollection;
			}
		}
		/**
		 * 如果用户输入的URL，在loadResourceDefine()中没有加载过（换句话说数据库中并没有配置此url，url和role的关系）
		 * ，就直接让过
		 * 也就是说，如果要对url进行权限校验，必须是在数据库中配置过的
		 */
		return null;
	}

	@Override
	public Collection<ConfigAttribute> getAllConfigAttributes() {
		return new ArrayList<ConfigAttribute>();
	}

	@Override
	public boolean supports(Class<?> clazz) {
		return true;
	}

	//加载所有资源与权限的关系
	private void loadResourceDefine() {
		if (resourceMap == null) {
			resourceMap = new HashMap<String, Collection<ConfigAttribute>>();
			List<TbInterceptUrl> resources = tbInterceptUrlService
					.findAllTbInterceptUrls();
			for (TbInterceptUrl resource : resources) {
				List<TbSysRole> tbSysRoleList = tbSysRoleService.findTbSysRolesByUrlPattern(resource.getUrlPattern());
				
				Collection<ConfigAttribute> configAttributes = new ArrayList<ConfigAttribute>();
				// 以权限名封装为Spring的security Object
				// resource.getRoleName() 角色名称 可随意 role_admin 或者 admin
				for(TbSysRole tbSysRole : tbSysRoleList) {
					ConfigAttribute configAttribute = new SecurityConfig(
							tbSysRole.getRoleCode());
					configAttributes.add(configAttribute);
				}
				// resource.getInterceptUrl() 格式必须是 拦截的包路径
				// 或者是 比如 /manager/**/*.jh 或者 /system/manager/**/*.jsp
				resourceMap.put(resource.getUrlPattern(), configAttributes);
			}
		}

	}

}
