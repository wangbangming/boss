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
                            'app/controllers/component.js'
                        ]
                    });
                }
            );
        }];
        $stateProvider.state('app.component', {
            url: '/component',
            templateUrl: 'views/component.html',
            ncyBreadcrumb: {
                label: '维保',
                description: '配件管理'
            },
            resolve: {
                deps: deps
            }
        });
    }
]);