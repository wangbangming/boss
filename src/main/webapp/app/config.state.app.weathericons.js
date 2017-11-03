'use strict';
angular.module('app').config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('app.weathericons', {
            url: '/weathericons',
            templateUrl: 'views/weather-icons.html',
            ncyBreadcrumb: {
                label: 'Weather Icons',
                description: 'Beautiful forcasting icons'
            }
        });
    }
]);
