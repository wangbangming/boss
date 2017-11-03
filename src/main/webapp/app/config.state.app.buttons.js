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
                        'app/controllers/button.js',
                        'app/controllers/dropdown.js'
                    ]
                });
            }
        ];
        $stateProvider.state('app.buttons', {
            url: '/buttons',
            templateUrl: 'views/buttons.html',
            ncyBreadcrumb: {
                label: 'Buttons'
            },
            resolve: {
                deps: deps
            }
        });
    }
]);
