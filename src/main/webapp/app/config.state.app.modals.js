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
                        'app/controllers/modal.js'
                    ]
                });
            }
        ];
        $stateProvider.state('app.modals', {
            url: '/modals',
            templateUrl: 'views/modals.html',
            ncyBreadcrumb: {
                label: 'Modals',
                description: 'Modals and Wells'
            },
            resolve: {
                deps: deps
            }
        });
    }
]);
