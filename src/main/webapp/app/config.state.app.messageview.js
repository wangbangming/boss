'use strict';
angular.module('app').config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('app.messageview', {
            url: '/viewmessage',
            templateUrl: 'views/message-view.html',
            ncyBreadcrumb: {
                label: 'Veiw Message'
            }
        });
    }
]);
