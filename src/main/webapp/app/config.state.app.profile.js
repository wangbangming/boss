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
                        'bower_components/jquery-flot/jquery.flot.js',
                        'bower_components/jquery-flot/jquery.flot.resize.js',
                        'app/controllers/profile.js'
                    ]
                });
            }
        ];
        $stateProvider.state('app.profile', {
            url: '/profile',
            templateUrl: 'views/profile.html',
            ncyBreadcrumb: {
                label: 'User Profile'
            },
            resolve: {
                deps: deps
            }
        });
    }
]);
