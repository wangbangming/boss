angular.module('app')
    .config([
        '$ocLazyLoadProvider', function($ocLazyLoadProvider) {
            $ocLazyLoadProvider.config({
                debug: true,
                events: true,
                modules: [
                    {
                        name: 'toaster',
                        files: [
                            'bower_components/angularjs-toaster/toaster.css',
                            'bower_components/angularjs-toaster/toaster.js'
                        ]
                    },
                    {
                        name: 'ui.select',
                        files: [
                            'bower_components/angular-ui-select/dist/select.css',
                            'bower_components/angular-ui-select/dist/select.js'
                        ]
                    },
                    {
                        name: 'ngTagsInput',
                        files: [
                            'bower_components/ng-tags-input/ng-tags-input.min.css',
                            'bower_components/ng-tags-input/ng-tags-input.min.js'
                        ]
                    },
                    {
                        name: 'daterangepicker',
                        files: [
                            'bower_components/bootstrap-daterangepicker/daterangepicker.js',
                            'bower_components/angular-daterangepicker/js/angular-daterangepicker.js'
                        ]
                    },
                    {
                        name: 'vr.directives.slider',
                        files: [
                            'bower_components/angular-slider-venturocket/build/angular-slider.js'
                        ]
                    },
                    {
                        name: 'minicolors',
                        files: [
                            'bower_components/jquery-minicolors/jquery.minicolors.js',
                            'bower_components/angular-minicolors/angular-minicolors.js'
                        ]
                    },
                    {
                        name: 'textAngular',
                        files: [
                            'bower_components/textAngular/dist/textAngular.css',
                            'bower_components/textAngular/dist/textAngular-rangy.min.js',
                            'bower_components/textAngular/dist/textAngular-sanitize.min.js',
                            'bower_components/textAngular/dist/textAngular.min.js'
                        ]
                    },
                    {
                        name: 'ng-nestable',
                        files: [
                            'bower_components/ng-nestable/lib/jquery.nestable.css',
                            'bower_components/ng-nestable/lib/jquery.nestable.js',
                            'bower_components/ng-nestable/src/angular-nestable.js'
                        ]
                    },
                    {
                        name: 'angularBootstrapNavTree',
                        files: [
                            'bower_components/angular-bootstrap-nav-tree/dist/abn_tree_directive.js'
                        ]
                    },
                    {
                        name: 'uiGrid',
                        files: [
                            'bower_components/angular-ui-grid/ui-grid.min.css',
                            'bower_components/angular-ui-grid/ui-grid.min.js'
                        ]
                    },
                    {
                        name: 'zTree',
                        files: [
                            'app/directives/zTree.js',
                            'bower_components/zTree/css/zTreeStyle/zTreeStyle.css',
                            'bower_components/zTree/js/jquery.ztree.all-3.5.min.js'
                        ]
                    }
                ]
            });
        }
    ]);
