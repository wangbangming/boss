'use strict';
angular.module('app').config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('app.formlayout', {
            url: '/formlayout',
            templateUrl: 'views/form-layout.html',
            ncyBreadcrumb: {
                label: 'Form Layouts'
            }
        });
    }
]);
