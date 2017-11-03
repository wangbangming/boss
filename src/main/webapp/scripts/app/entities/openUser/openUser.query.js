'use strict';

angular.module('myApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('openUserQuery', {
                parent: 'entity',
                url: '/openUser/query',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'ous.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/openUser/openUser.query.html',
                        controller: 'OpenUserController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('ous');
                        return $translate.refresh();
                    }]
                }
            });
    });

