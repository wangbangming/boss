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
                            'app/services/role.service.js',
                            'app/controllers/role.js'
                        ]
                    });
                }
            );
        }];
        $stateProvider.state('app.role', {
            url: '/role',
            templateUrl: 'views/role.html',
            ncyBreadcrumb: {
                label: '角色',
                description: '角色管理'
            },
            resolve: {
                deps: deps
            }
        });
    }
]);
