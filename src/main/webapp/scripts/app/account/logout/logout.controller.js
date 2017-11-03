'use strict';

angular.module('myApp')
    .controller('LogoutController', function (Auth) {
        var MT = 'myApp - LogoutController ... '; c.log(MT);
        Auth.logout();
    });
