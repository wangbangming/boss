'use strict';
angular.module('app').config([
    '$stateProvider',
    function ($stateProvider) {
        var deps = [
            '$ocLazyLoad',
            function ($ocLazyLoad) {
                return $ocLazyLoad.load(['textAngular']).then(
                    function () {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/controllers/textangular.js'
                            ]
                        });
                    }
                );
            }
        ];
        $stateProvider.state('app.formeditors', {
            url: '/formeditors',
            templateUrl: 'views/form-editors.html',
            ncyBreadcrumb: {
                label: 'Form Editors'
            },
            resolve: {
                deps: deps
            }
        });
    }
]);
