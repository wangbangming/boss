package com.boss.service;

import com.boss.entity.vo.TrRoleUrl;

import java.util.List;

/**
 * @author WangBangMing
 * @create 2017/11/3 13:37
 */
public interface ITrRoleUrlService {
    List<TrRoleUrl> findTrRoleUrlsByRoleId(Long roleId);

    void deleteLogic(TrRoleUrl trRoleUrl);

    TrRoleUrl save(TrRoleUrl trRoleUrl);
}
