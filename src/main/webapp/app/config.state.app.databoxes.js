'use strict';
angular.module('app').config([
    '$stateProvider',
    function ($stateProvider) {
        var files = [
            'bower_components/jquery.sparkline.build/dist/jquery.sparkline.js',
            'bower_components/jquery.easy-pie-chart/dist/jquery.easypiechart.js',
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
            'bower_components/raphael/raphael.js',
            'bower_components/chartjs/Chart.js',
            'bower_components/mocha/mocha.css',
            'bower_components/mocha/mocha.js',
            'bower_components/morrisjs/morris.js',
            'app/directives/realtimechart.js',
            'app/controllers/databoxes.js'
        ];
        var deps = ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load({
                serie: true,
                files: files
            });
        }];
        $stateProvider.state('app.databoxes', {
            url: '/databoxes',
            templateUrl: 'views/databoxes.html',
            ncyBreadcrumb: {
                label: 'Databoxes',
                description: 'beyond containers'
            },
            resolve: {
                '': deps
            }
        });
    }
]);
