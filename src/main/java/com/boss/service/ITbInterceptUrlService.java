package com.boss.service;

import com.boss.entity.vo.TbInterceptUrl;

import java.util.List;

/**
 * @author WangBangMing
 * @create 2017/11/3 13:34
 */
public interface ITbInterceptUrlService {

    List<TbInterceptUrl> findAllTbInterceptUrls();

    List<TbInterceptUrl> findTbInterceptUrlsByRoleId(Long roleId);
}
