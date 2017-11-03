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
                            'app/services/maintainplan.service.js',
                            'app/controllers/maintainplan.js'
                        ]
                    });
                }
            );
        }];
        $stateProvider.state('app.maintainplan', {
            url: '/maintainplan',
            templateUrl: 'views/maintainplan.html',
            ncyBreadcrumb: {
                label: '维保',
                description: '维保管理'
            },
            resolve: {
                deps: deps
            }
        });
    }
]);