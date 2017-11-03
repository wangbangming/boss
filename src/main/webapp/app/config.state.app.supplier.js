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
                            'app/services/supplier.service.js',
                            'app/controllers/supplier.js'
                        ]
                    });
                }
            );
        }];
        $stateProvider.state('app.supplier', {
            url: '/supplier',
            templateUrl: 'views/supplier.html',
            ncyBreadcrumb: {
                label: '供应商',
                description: '供应商管理'
            },
            resolve: {
                deps: deps
            }
        });
    }
]);
