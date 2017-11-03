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
                            'app/controllers/url.js',
                            'app/services/url.service.js'
                        ]
                    });
                }
            );
        }];
        $stateProvider.state('app.url', {
            url: '/url',
            templateUrl: 'views/url.html',
            ncyBreadcrumb: {
                label: '后台URL',
                description: '后台URL管理'
            },
            resolve: {
                deps: deps
            }
        });
    }
]);
