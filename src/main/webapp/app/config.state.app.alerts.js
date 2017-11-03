'use strict';
angular.module('app').config([
    '$stateProvider',
    function ($stateProvider) {
        var deps = [
            '$ocLazyLoad',
            function ($ocLazyLoad) {
                return $ocLazyLoad.load('toaster').then(
                    function () {
                        return $ocLazyLoad.load({
                                serie: true,
                                files: [
                                    'app/controllers/alert.js',
                                    'app/controllers/toaster.js'
                                ]
                            }
                        );
                    });
            }
        ];
        $stateProvider.state('app.alerts', {
            url: '/alerts',
            templateUrl: 'views/alerts.html',
            ncyBreadcrumb: {
                label: 'Alerts',
                description: 'Tooltips and Notifications'
            },
            resolve: {
                deps: deps
            }
        });
    }
]);
