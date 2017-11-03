'use strict';
angular.module('app').config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('app.inbox', {
            url: '/inbox',
            templateUrl: 'views/inbox.html',
            ncyBreadcrumb: {
                label: 'Beyond Mail'
            }
        });
    }
]);
