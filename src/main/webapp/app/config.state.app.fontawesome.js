'use strict';
angular.module('app').config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('app.fontawesome', {
            url: '/fontawesome',
            templateUrl: 'views/font-awesome.html',
            ncyBreadcrumb: {
                label: 'FontAwesome',
                description: 'Iconic Fonts'
            }
        });
    }
]);
