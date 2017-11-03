'use strict';
angular.module('app').config([
    '$stateProvider',
    function ($stateProvider) {
        var deps = [
            '$ocLazyLoad',
            function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    serie: true,
                    files: [
                        'bower_components/jquery.sparkline.build/dist/jquery.sparkline.js',
                    ]
                });
            }
        ];
        $stateProvider.state('app.sparkline', {
            url: '/sparkline',
            templateUrl: 'views/sparkline.html',
            ncyBreadcrumb: {
                label: 'Sparkline',
                description: 'inline charts'
            },
            resolve: {
                deps: deps
            }
        });
    }
]);
