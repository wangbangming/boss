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
                        'app/controllers/validation.js'
                    ]
                });
            }
        ];
        $stateProvider.state('app.formvalidation', {
            url: '/formvalidation',
            templateUrl: 'views/form-validation.html',
            ncyBreadcrumb: {
                label: 'Form Validation',
                description: 'Bootstrap Validator'
            },
            resolve: {
                deps: deps
            }
        });
    }
]);
