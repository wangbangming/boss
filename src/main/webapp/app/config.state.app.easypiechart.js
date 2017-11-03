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
                        'bower_components/jquery.easy-pie-chart/dist/jquery.easypiechart.js'
                    ]
                });
            }
        ];
        $stateProvider.state('app.easypiechart', {
            url: '/easypiechart',
            templateUrl: 'views/easypiechart.html',
            ncyBreadcrumb: {
                label: 'Easy Pie Charts',
                description: 'lightweight charts'
            },
            resolve: {
                deps: deps
            }
        });
    }
]);
