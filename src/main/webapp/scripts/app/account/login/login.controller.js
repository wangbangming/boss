'use strict';

c.log('myApp.controller:LoginController');
angular.module('myApp')
    .controller('LoginController', function ($rootScope, $scope, $state, $timeout, Auth) {
        var MT = 'myApp - LoginController ... '; c.log(MT);
        $scope.user = {};
        $scope.errors = {};

        $scope.rememberMe = 'admin';
        $scope.rememberMe = 'admin';
        $scope.rememberMe = false;

        $timeout(function (){angular.element('[ng-model="username"]').focus();});
        $scope.login = function (event) {
            event.preventDefault();
            Auth.login({
                username: $scope.username,
                password: $scope.password,
                rememberMe: $scope.rememberMe
            }).then(function () {
                $scope.authenticationError = false;
                if ($rootScope.previousStateName === 'register') {
                    $state.go('home');
                } else {
                    $rootScope.back();
                }
            }).catch(function () {
                $scope.authenticationError = true;
            });
        };
    });
