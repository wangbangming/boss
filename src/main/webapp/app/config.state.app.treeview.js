'use strict';
angular.module('app').config([
    '$stateProvider',
    function ($stateProvider) {
        var deps = [
            '$ocLazyLoad',
            function ($ocLazyLoad) {
                return $ocLazyLoad.load(['angularBootstrapNavTree']).then(
                    function () {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/controllers/treeview.js'
                            ]
                        });
                    }
                );
            }
        ];
        $stateProvider.state('app.treeview', {
            url: '/treeview',
            templateUrl: 'views/treeview.html',
            ncyBreadcrumb: {
                label: 'Treeview',
                description: "Fuel UX's tree"
            },
            resolve: {
                deps: deps
            }
        });
    }
]);
