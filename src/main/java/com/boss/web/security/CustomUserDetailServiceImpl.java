package com.boss.web.security;

import com.boss.entity.vo.TbSysRole;
import com.boss.entity.vo.TbSysUser;
import com.boss.service.ITbSysRoleService;
import com.boss.service.ITbSysUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * 用户登录后赋权操作
 * @author WangBangMing
 *
 */
public class CustomUserDetailServiceImpl implements UserDetailsService {

	@Autowired
	ITbSysUserService tbSysUserService;
	@Autowired
	ITbSysRoleService tbSysRoleService;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		UserDetails user = null;
		
		try{
			TbSysUser tbSysUser = tbSysUserService.findTbSysUserByAccount(username);
			boolean enabled = true;
			boolean accountNonExpired = true;
			boolean credentialsNonExpired = true;
			boolean accountNonLocked = true;
			user = new User(tbSysUser.getAccount(),
					tbSysUser.getPassword(), enabled, accountNonExpired,
					credentialsNonExpired, accountNonLocked,
					getAuthorities(username));
		} catch (Exception e) {
			throw new UsernameNotFoundException("Error in retrieving user");
		}

		return user;

	}

	private Collection<GrantedAuthority> getAuthorities(String username) {
		List<GrantedAuthority> authList = new ArrayList<GrantedAuthority>();
		List<TbSysRole> tbSysRoleList = tbSysRoleService.findTbSysRolesByUserAccount(username);
		
		for(TbSysRole tbSysRole : tbSysRoleList) {
			authList.add(new SimpleGrantedAuthority(tbSysRole.getRoleCode()));
		}
		return authList;
	}

}
