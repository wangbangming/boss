'use strict';
angular.module('app').config([
    '$stateProvider',
    function ($stateProvider) {
        var MT = 'config.state.app.dashboard.js - .config $stateProvider - ';
        c.log(MT, '...');
        var files = [
            'bower_components/jquery.easy-pie-chart/dist/jquery.easypiechart.min.js',
            'bower_components/jquery-flot/excanvas.js',
            'bower_components/jquery-flot/jquery.colorhelpers.js',
            'bower_components/jquery-flot/jquery.flot.js',
            'bower_components/jquery-flot/jquery.flot.resize.js',
            'bower_components/jquery-flot/jquery.flot.pie.js',
            'bower_components/jquery-flot/jquery.flot.canvas.js',
            'bower_components/jquery-flot/jquery.flot.categories.js',
            'bower_components/jquery-flot/jquery.flot.crosshair.js',
            'bower_components/jquery-flot/jquery.flot.errorbars.js',
            'bower_components/jquery-flot/jquery.flot.fillbetween.js',
            'bower_components/jquery-flot/jquery.flot.image.js',
            'bower_components/jquery-flot/jquery.flot.navigate.js',
            'bower_components/jquery-flot/jquery.flot.selection.js',
            'bower_components/jquery-flot/jquery.flot.stack.js',
            'bower_components/jquery-flot/jquery.flot.symbol.js',
            'bower_components/jquery-flot/jquery.flot.threshold.js',
            'bower_components/jquery-flot/jquery.flot.time.js',
            'app/controllers/dashboard.js',
            'app/directives/realtimechart.js'
        ];
        var deps = ['$ocLazyLoad', function ($ocLazyLoad) {
            c.log(MT, '$ocLazyLoad.load...');
            return $ocLazyLoad.load({
                serie: true,
                files: files
            });
        }];
        $stateProvider.state('app.dashboard', {
            url: '/dashboard',
            templateUrl: 'views/dashboard.html',
            ncyBreadcrumb: {
                label: 'Dashboard',
                description: ''
            },
            resolve: {
                '': deps
            }
        });
    }
]);
