'use strict';

angular.module('myApp')
    .controller('ActivationController', function ($scope, $stateParams, Auth) {
        var MT = 'myApp - ActivationController ... '; c.log(MT);
        Auth.activateAccount({key: $stateParams.key}).then(function () {
            $scope.error = null;
            $scope.success = 'OK';
        }).catch(function () {
            $scope.success = null;
            $scope.error = 'ERROR';
        });
    });

