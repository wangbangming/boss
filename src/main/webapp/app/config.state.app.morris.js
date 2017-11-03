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
                        'bower_components/raphael/raphael.js',
                        'bower_components/mocha/mocha.css',
                        'bower_components/mocha/mocha.js',
                        'bower_components/morrisjs/morris.js',
                        'app/controllers/morris.js'
                    ]
                });
            }
        ];
        $stateProvider.state('app.morris', {
            url: '/morris',
            templateUrl: 'views/morris.html',
            ncyBreadcrumb: {
                label: 'Morris Charts',
                description: 'simple & flat charts'
            },
            resolve: {
                deps: deps
            }
        });
    }
]);
