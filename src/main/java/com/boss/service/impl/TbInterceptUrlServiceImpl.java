package com.boss.service.impl;

import com.boss.dao.TbInterceptUrlMapper;
import com.boss.entity.vo.TbInterceptUrl;
import com.boss.service.ITbInterceptUrlService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author WangBangMing
 * @create 2017/11/3 13:39
 */
@Service
public class TbInterceptUrlServiceImpl implements ITbInterceptUrlService {

    @Autowired
    private TbInterceptUrlMapper interceptUrlDao;

    @Override
    public List<TbInterceptUrl> findAllTbInterceptUrls() {
        return interceptUrlDao.findAllTbInterceptUrls();
    }

    @Override
    public List<TbInterceptUrl> findTbInterceptUrlsByRoleId(Long roleId) {
        return interceptUrlDao.findTbInterceptUrlsByRoleId(roleId);
    }
}
