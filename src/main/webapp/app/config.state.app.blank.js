'use strict';
angular.module('app').config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('app.blank', {
            url: '/blank',
            templateUrl: 'views/blank.html',
            ncyBreadcrumb: {
                label: 'Blank Page'
            }
        });
    }
]);
