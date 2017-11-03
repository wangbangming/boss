'use strict';
angular.module('app').config([
    '$stateProvider',
    function ($stateProvider) {
//        var deps = ['$ocLazyLoad', function ($ocLazyLoad) {
//            return $ocLazyLoad.load(['uiGrid2']).then(
//                function () {
//                    return $ocLazyLoad.load({
//                        serie: true,
//                        files: [
////                            'app/services/supplier.service.js',
////                            'app/controllers/supplier.js'
//                        ]
//                    });
//                }
//            );
//        }];
        $stateProvider.state('app.test', {
            url: '/test',
            templateUrl: 'views/test.html',
            ncyBreadcrumb: {
                label: 'CESHI',
                description: '测试管理'
            },
            resolve: {
//                deps: deps
            }
        });
    }
]);