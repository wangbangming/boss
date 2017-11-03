'use strict';
angular.module('app').run([
    '$rootScope', '$state', '$stateParams',
    function ($rootScope, $state, $stateParams) {
        var MT = 'run.js - .run - '; c.log(MT, '...');
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        $rootScope.sidebarMenuItems = [
            {menuText:'仪表盘', uiSref:'app.dashboard', iClass:'menu-icon glyphicon glyphicon-home'},
            {menuText:'数据盒', uiSref:'app.databoxes', iClass:'menu-icon glyphicon glyphicon-tasks'},
            {menuText:'小部件', uiSref:'app.widgets', iClass:'menu-icon fa fa-th'}
        ];

        $rootScope.$on('$stateChangeSuccess',  function(event, toState, toParams, fromState, fromParams) {
            var MT = '$rootScope.$on $stateChangeSuccess ... ';
            c.log(MT, 'fromState:', fromState);
            c.log(MT, 'toState:', toState);
        });
        
        $rootScope.$watch('$viewContentLoaded', function() {  
        	if(!window.name){
                window.name = 'boss';
                window.location.reload();
        	}
        });

    }
]);
