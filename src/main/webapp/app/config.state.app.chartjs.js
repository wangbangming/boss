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
                        'bower_components/chartjs/Chart.js',
                        'app/controllers/chartjs.js'
                    ]
                });
            }
        ];
        $stateProvider.state('app.chartjs', {
            url: '/chartjs',
            templateUrl: 'views/chartjs.html',
            ncyBreadcrumb: {
                label: 'ChartJS',
                description: 'Cool HTML5 Charts'
            },
            resolve: {
                deps: deps
            }
        });
    }
]);
