'use strict';

angular.module('myApp')

    .factory('OpenUsersResource', function ($resource) {
        return $resource('api/openUsers/:userId', {userId: '@id'}, {});
    })

    .factory('DemoService', function DemoService($rootScope, $state, $q, $translate, OpenUsersResource) {
        return {
            openUsersGet: function (userId, callback) {
                var FT = 'openUsersGet - ';
                var cb = callback || angular.noop;
                c.log(FT, 'userId : ', userId, 'cb :', cb);
                return OpenUsersResource.get({"userId": userId},
                    function (response) {
                        c.log(FT, 'response : ', response);
                        return cb(response);
                    },
                    function (err) {
                        return cb(err);
                    }.bind(this)).$promise;
            },
            openUsersQuery: function (queryParams, callback) {
                var FT = 'openUsersQuery - ';
                var cb = callback || angular.noop;
                c.log(FT, 'queryParams :', queryParams, 'cb :', cb);
                return OpenUsersResource.query(queryParams,
                    function (response) {
                        c.log(FT, 'response : ', response);
                        c.log(FT, 'response[0] : ', response.length ? response[0] : null);
                        return cb(response);
                    },
                    function (err) {
                        return cb(err);
                    }.bind(this)).$promise;
            },
            openUsersSave: function (openUser, callback) {
                var FT = 'openUsersSave - ';
                var cb = callback || angular.noop;
                c.log(FT, 'openUser :', openUser, 'cb :', cb);
                return OpenUsersResource.save(openUser,
                    function (response) {
                        c.log(FT, 'response : ', response);
                        return cb(response);
                    },
                    function (err) {
                        return cb(err);
                    }.bind(this)).$promise;
            },
            openUsersRemove: function (removeParams, callback) {
                var FT = 'openUsersRemove - ';
                var cb = callback || angular.noop;
                c.log(FT, 'removeParams :', removeParams, 'cb :', cb);
                return OpenUsersResource.remove(removeParams,
                    function (response) {
                        c.log(FT, 'response : ', response);
                        return cb(response);
                    },
                    function (err) {
                        return cb(err);
                    }.bind(this)).$promise;
            }
        };
    })

;
