'use strict';
angular.module('app').config([
    '$stateProvider',
    function ($stateProvider) {
        var deps = [
            '$ocLazyLoad',
            function ($ocLazyLoad) {
                return $ocLazyLoad
                    .load(['textAngular'])
                    .then(function () {
                        return $ocLazyLoad.load({
                            serie: true,
                            files: [
                                'app/controllers/textangular.js'
                            ]
                        });
                    });
            }
        ];
        $stateProvider.state('app.messagecompose', {
            url: '/composemessage',
            templateUrl: 'views/message-compose.html',
            ncyBreadcrumb: {
                label: 'Compose Message'
            },
            resolve: {
                deps: deps
            }
        });
    }
]);
