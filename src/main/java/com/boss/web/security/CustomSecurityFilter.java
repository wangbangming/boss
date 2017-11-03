package com.boss.web.security;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import org.springframework.security.access.SecurityMetadataSource;
import org.springframework.security.access.intercept.AbstractSecurityInterceptor;
import org.springframework.security.access.intercept.InterceptorStatusToken;
import org.springframework.security.web.FilterInvocation;
import org.springframework.security.web.access.intercept.FilterInvocationSecurityMetadataSource;

/**
 * 过滤用户请求
 * @author WangBangMing
 */
public class CustomSecurityFilter extends AbstractSecurityInterceptor implements
		Filter {
	// 与applicationContext-security.xml里的customFilter的属性securityMetadataSource对应，
	// 其他的两个组件，已经在AbstractSecurityInterceptor定义
	private FilterInvocationSecurityMetadataSource securityMetadataSource;

	@Override
	public void destroy() {

	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		FilterInvocation fi = new FilterInvocation(request, response, chain);
		invoke(fi);
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {

	}

	@Override
	public Class<?> getSecureObjectClass() {
		// 下面的CustomAccessDecisionManager的supports方面必须放回true,否则会提醒类型错误
		return FilterInvocation.class;
	}

	@Override
	public SecurityMetadataSource obtainSecurityMetadataSource() {
		return this.securityMetadataSource;
	}

	private void invoke(FilterInvocation fi) throws IOException,
			ServletException {
		// object为FilterInvocation对象
		// super.beforeInvocation(fi);//源码
		// 1.获取请求资源的权限
		// 执行 Collection<ConfigAttribute> attributes =
		// securityMetadataSource.getAttributes(fi);
		// 2.是否拥有权限
		// this.accessDecisionManager.decide(authenticated, fi, attributes);
		// this.accessDecisionManager.decide(authenticated, fi, attributes);
		InterceptorStatusToken token = super.beforeInvocation(fi);
		try {
			fi.getChain().doFilter(fi.getRequest(), fi.getResponse());
		} finally {
			super.afterInvocation(token, null);
		}
	}
	/**
	 * 核心的InterceptorStatusToken token =
	 * super.beforeInvocation(fi);会调用我们定义的accessDecisionManager:decide(Object
	 * object)和securityMetadataSource :getAttributes(Object object)方法。
	 */
	public FilterInvocationSecurityMetadataSource getSecurityMetadataSource() {
		return securityMetadataSource;
	}

	public void setSecurityMetadataSource(
			FilterInvocationSecurityMetadataSource securityMetadataSource) {
		this.securityMetadataSource = securityMetadataSource;
	}

}
