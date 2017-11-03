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
                        'lib/jquery/fuelux/wizard/wizard-custom.js'
                    ]
                });
            }
        ];
        $stateProvider.state('app.formwizard', {
            url: '/formwizard',
            templateUrl: 'views/form-wizard.html',
            ncyBreadcrumb: {
                label: 'Form Wizard'
            },
            resolve: {
                deps: deps
            }
        });
    }
]);
