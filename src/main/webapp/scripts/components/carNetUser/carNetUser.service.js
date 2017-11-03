'use strict';

angular.module('myApp')
    .factory('CarNetUserService', function ($resource) {
        var restUrl = 'api/carNetUsers'; var params = {}; var method = 'GET'; var isArray = false;
        return $resource(restUrl, params, {
            'findAll': { method: method, isArray: isArray}
        });
    });
