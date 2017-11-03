'use strict';
angular.module('app').config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('app.widgets', {
            url: '/widgets',
            templateUrl: 'views/widgets.html',
            ncyBreadcrumb: {
                label: 'Widgets',
                description: 'flexible containers'
            }
        });
    }
]);
