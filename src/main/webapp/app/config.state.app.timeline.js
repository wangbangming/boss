'use strict';
angular.module('app').config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('app.timeline', {
            url: '/timeline',
            templateUrl: 'views/timeline.html',
            ncyBreadcrumb: {
                label: 'Responsive Timeline'
            }
        });
    }
]);
