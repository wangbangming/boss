'use strict';
angular.module('app').config([
    '$stateProvider',
    function ($stateProvider) {
        var deps = ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad
                .load(['ui.select', 'ngTagsInput', 'daterangepicker', 'vr.directives.slider', 'minicolors'])
                .then(function () {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            'app/controllers/select2.js',
                            'app/controllers/tagsinput.js',
                            'app/controllers/datepicker.js',
                            'app/controllers/timepicker.js',
                            'app/controllers/daterangepicker.js',
                            'bower_components/fuelux/dist/js/fuelux.js',
                            'bower_components/jquery-knob/js/jquery.knob.js',
                            'bower_components/jquery-autosize/jquery.autosize.js',
                            'app/controllers/slider.js',
                            'app/controllers/minicolors.js'
                        ]
                    });
                }
            );
        }];
        $stateProvider.state('app.formpickers', {
            url: '/formpickers',
            templateUrl: 'views/form-pickers.html',
            ncyBreadcrumb: {
                label: 'Form Pickers',
                description: 'Data Pickers '
            },
            resolve: {
                deps: deps
            }
        });
    }
]);
