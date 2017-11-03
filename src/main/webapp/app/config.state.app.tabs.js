'use strict';
angular.module('app').config([
    '$stateProvider',
    function ($stateProvider) {
        var deps = [
            '$ocLazyLoad',
            function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    serie: true,
                    files: [
                        'app/controllers/accordion.js',
                        'app/controllers/tab.js'
                    ]
                });
            }
        ];
        $stateProvider.state('app.tabs', {
            url: '/tabs',
            templateUrl: 'views/tabs.html',
            ncyBreadcrumb: {
                label: 'Tabs',
                description: 'Tabs and Accordions'
            },
            resolve: {
                deps: deps
            }
        });
    }
]);
