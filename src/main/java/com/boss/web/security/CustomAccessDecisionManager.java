package com.boss.web.security;

import java.util.Collection;
import java.util.Iterator;

import org.springframework.security.access.AccessDecisionManager;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

/**
 * SpringSecurity在用户请求资源时验证
 * @author WangBangMing
 *
 */
public class CustomAccessDecisionManager implements AccessDecisionManager {

	@Override
	public void decide(Authentication authentication, Object object,
			Collection<ConfigAttribute> configAttributes)
			throws AccessDeniedException, InsufficientAuthenticationException {
		if(configAttributes == null) {    
            return;    
        }    
        //所请求的资源需要拥有的权限(一个资源对多个权限)    
        Iterator<ConfigAttribute> iterator = configAttributes.iterator();    
        while(iterator.hasNext()) {    
            ConfigAttribute configAttribute = iterator.next();    
            //访问所请求资源所需要的权限
            //在CustomSecurityMetadataSource中初始化的
            String needPermission = configAttribute.getAttribute();//在这里是role_code    
            //用户所拥有的权限authentication
            //在CustomUserDetailServiceImpl中初始化的
            for(GrantedAuthority ga : authentication.getAuthorities()) {    
                if(needPermission.equals(ga.getAuthority())) {    
                    return;    
                }    
            }    
        }    
        //没有权限    会跳转到login.jsp页面  
        throw new AccessDeniedException("没有权限访问");
		
	}

	@Override
	public boolean supports(ConfigAttribute attribute) {
		return true;
	}

	@Override
	public boolean supports(Class<?> clazz) {
		return true;
	}

}
