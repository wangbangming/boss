'use strict';

c.log('myApp.controller:MainController');
angular.module('myApp')
    .controller('MainController', function ($scope, Principal, DemoService) {
        var MT = 'myApp - MainController ... '; c.log(MT);
        Principal.identity().then(function(account) {
            $scope.account = account;
            $scope.isAuthenticated = Principal.isAuthenticated;
        });

        $scope.clearConsole = function () {
            if(c.clear) c.clear();
        };

        $scope.demoGet = function (userId, callback) {
            return DemoService.openUsersGet(userId).then(
                function (res) {
                    c.log(MT, 'res:', res);
                },
                function (err) {
                    c.log(MT, 'err:', err);
                }
            );
        };

        $scope.demoQuery = function (callback) {
            var filter = {ids:[456,789], nickNamePartial:"管家"};
            var ou = {openId:"0F39B534D2C0839B16DF83362037E964",nickName:"Q凉风"};
            var queryParams = {filter:filter, ou:ou};
            return DemoService.openUsersQuery(queryParams, callback).then(
                function (res) {
                    c.log(MT, 'res:', res);
                },
                function (err) {
                    c.log(MT, 'err:', err);
                }
            );
        };

        $scope.demoSave = function (callback) {
            $scope.openUser = {
                uid : null,
                openId : "abc",
                nickName : "彼得"
            };
            return DemoService.openUsersSave($scope.openUser, callback);
        };

        $scope.demoRemove = function (callback) {
            var removeParams = {uids:[456,789]};
            return DemoService.openUsersRemove(removeParams, callback);
        };

        $scope.data = [{name: "Moroni", age: 50, money: -10},
            {name: "Tiancum", age: 43,money: 120},
            {name: "Jacob", age: 27, money: 5.5},
            {name: "Nephi", age: 29,money: -54},
            {name: "Enos", age: 34,money: 110},
            {name: "Tiancum", age: 43, money: 1000},
            {name: "Jacob", age: 27,money: -201},
            {name: "Nephi", age: 29, money: 100},
            {name: "Enos", age: 34, money: -52.5},
            {name: "Tiancum", age: 43, money: 52.1},
            {name: "Jacob", age: 27, money: 110},
            {name: "Nephi", age: 29, money: -55},
            {name: "Enos", age: 34, money: 551},
            {name: "Tiancum", age: 43, money: -1410},
            {name: "Jacob", age: 27, money: 410},
            {name: "Nephi", age: 29, money: 100},
            {name: "Enos", age: 34, money: -100}];

    });
