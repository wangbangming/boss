'use strict';

angular.module('app')
    .factory('SupplierResource', function ($resource) {
        return $resource('rest/suppliers', {}, {
        });
    });

angular.module('app')
    .factory('SupplierService', function($rootScope, $state, $q, SupplierResource) {
        return {
            one: function (id, callback) {
                var FT = 'SupplierService.one - ';
                var cb = callback || angular.noop;
                c.log(FT, 'id : ', id, 'cb :', cb);
                return SupplierResource.get({"id": id},
                    function (response) {
                        c.log(FT, 'response : ', response);
                        return cb(response);
                    },
                    function (err) {
                        return cb(err);
                    }.bind(this)).$promise;
            },
            query: function (queryParams, callback) {
                var FT = 'SupplierService.query - ';
                var cb = callback || angular.noop;
                c.log(FT, 'queryParams :', queryParams, 'cb :', cb);
                return SupplierResource.query(queryParams,
                    function (response) {
                        c.log(FT, 'response : ', response);
                        c.log(FT, 'response[0] : ', response.length ? response[0] : null);
                        return cb(response);
                    },
                    function (err) {
                        return cb(err);
                    }.bind(this)).$promise;
            },
            save: function (supplier, callback) {
                var FT = 'SupplierService.save - ';
                var cb = callback || angular.noop;
                c.log(FT, 'supplier :', supplier, 'cb :', cb);
                return SupplierResource.save(supplier,
                    function (response) {
                        c.log(FT, 'response : ', response);
                        return cb(response);
                    },
                    function (err) {
                        return cb(err);
                    }.bind(this)).$promise;
            },
            remove: function (id, callback) {
                var FT = 'SupplierService.remove - ';
                var cb = callback || angular.noop;
                c.log(FT, 'id :', id, 'cb :', cb);
                return SupplierResource.remove({"id": id},
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
