'use strict';

angular.module('myApp')
    .controller('OpenUserController', function ($scope, DemoService) {
        var MT = 'myApp - OpenUserController ... '; c.log(MT);
        DemoService.openUsersQuery().then(
            function (result) {
                c.log(MT, 'result:', result);
				$scope.openUsers = result;
            },
            function (err) {
                c.log(MT, 'err:', err);
            }
        );
    });
