'use strict';
angular.module('app').config([
    '$stateProvider',
    function ($stateProvider) {
        var deps = ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load(['uiGrid']).then(
                function () {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            'app/services/user.service.js',
                            'app/controllers/user.js'
                        ]
                    });
                }
            );
        }];
        $stateProvider.state('app.user', {
            url: '/user',
            templateUrl: 'views/user.html',
            ncyBreadcrumb: {
                label: '后台用户',
                description: '后台用户管理'
            },
            resolve: {
                deps: deps
            }
        });
    }
]);
