'use strict';
angular.module('app').config([
    '$stateProvider',
    function ($stateProvider) {
        var deps = [
            '$ocLazyLoad',
            function ($ocLazyLoad) {
                return $ocLazyLoad.load(['ng-nestable']).then(
                    function () {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/controllers/nestable.js'
                            ]
                        });
                    }
                );
            }
        ];
        $stateProvider.state('app.nestablelist', {
            url: '/nestablelist',
            templateUrl: 'views/nestable-list.html',
            ncyBreadcrumb: {
                label: 'Nestable Lists',
                description: 'Dragable list items'
            },
            resolve: {
                deps: deps
            }
        });
    }
]);
