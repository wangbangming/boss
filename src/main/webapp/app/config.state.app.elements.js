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
                        'app/controllers/pagination.js',
                        'app/controllers/progressbar.js'
                    ]
                });
            }
        ];
        $stateProvider.state('app.elements', {
            url: '/elements',
            templateUrl: 'views/elements.html',
            ncyBreadcrumb: {
                label: 'UI Elements',
                description: 'Basics'
            },
            resolve: {
                deps: deps
            }
        });
    }
]);
