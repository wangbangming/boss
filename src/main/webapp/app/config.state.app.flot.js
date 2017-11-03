'use strict';
angular.module('app').config([
    '$stateProvider',
    function ($stateProvider) {
        var deps = [
            '$ocLazyLoad',
            function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    serie: true,
                    files: [
                        'app/directives/realtimechart.js',
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
                        'app/controllers/flot.js'
                    ]
                });
            }
        ];
        $stateProvider.state('app.flot', {
            url: '/flot',
            templateUrl: 'views/flot.html',
            ncyBreadcrumb: {
                label: 'Flot Charts',
                description: 'attractive plotting'
            },
            resolve: {
                deps: deps
            }
        });
    }
]);
