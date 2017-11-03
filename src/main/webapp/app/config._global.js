var app = angular.module('app');

app.config([
    '$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
    function($controllerProvider, $compileProvider, $filterProvider, $provide) {
        var MT = 'config._global.js - .config $controllerProvider, $compileProvider, $filterProvider, $provide - ';
        c.log(MT, '...');
        app.controller = $controllerProvider.register;
        app.directive = $compileProvider.directive;
        app.filter = $filterProvider.register;
        app.factory = $provide.factory;
        app.service = $provide.service;
        app.constant = $provide.constant;
        app.value = $provide.value;
    }
]);

app.config(function($breadcrumbProvider) {
    var MT = 'config._global.js - .config $breadcrumbProvider - ';
    c.log(MT, '...');
    $breadcrumbProvider.setOptions({
        template:
        '<ul class="breadcrumb">' +
        '<li><i class="fa fa-home"></i><a ui-sref="app.dashboard">Home</a></li>' +
        '<li ng-repeat="step in steps" ng-class="{active: $last}" ng-switch="$last || !!step.abstract">' +
        '<a ng-switch-when="false" href="{{step.ncyBreadcrumbLink}}">{{step.ncyBreadcrumbLabel}}</a>' +
        '<span ng-switch-when="true">{{step.ncyBreadcrumbLabel}}</span>' +
        '</li>' +
        '</ul>'
    });
});
