'use strict';
angular.module('app').config([
    '$stateProvider',
    function ($stateProvider) {
        var deps = ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load(['zTree']).then(
                function () {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            'app/controllers/menu.js',
                            'app/services/menu.service.js'
                        ]
                    });
                }
            );
        }];
        $stateProvider.state('app.menu', {
            url: '/menu',
            templateUrl: 'views/menu.html',
            ncyBreadcrumb: {
                label: '菜单',
                description: '菜单管理'
            },
            resolve: {
                deps: deps
            }
        });
    }
]);
