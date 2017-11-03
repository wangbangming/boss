'use strict';
angular.module('app').config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('app.forminputs', {
            url: '/forminputs',
            templateUrl: 'views/form-inputs.html',
            ncyBreadcrumb: {
                label: 'Form Inputs'
            }
        });
    }
]);
