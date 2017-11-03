'use strict';
angular.module('app').config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('app.glyphicons', {
            url: '/glyphicons',
            templateUrl: 'views/glyph-icons.html',
            ncyBreadcrumb: {
                label: 'GlyphIcons',
                description: 'Sharp and clean symbols'
            }
        });
    }
]);
