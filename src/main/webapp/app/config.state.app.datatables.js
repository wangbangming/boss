'use strict';
angular.module('app').config([
    '$stateProvider',
    function ($stateProvider) {
        var deps = [
            '$ocLazyLoad',
            function ($ocLazyLoad) {
                return $ocLazyLoad.load(['uiGrid']).then(
                    function () {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/controllers/uigrid.js'
                            ]
                        });
                    }
                );

            }
        ];
        $stateProvider.state('app.datatables', {
            url: '/datatables',
            templateUrl: 'views/tables-data.html',
            ncyBreadcrumb: {
                label: 'Datatables',
                description: 'data management by uiGrid'
            },
            resolve: {
                deps: deps
            }

        });
    }
]);
