'use strict';
angular.module('app').factory('MaintainPlanService', function($http, $q) {
    return {
        queryMaintainPlans : function(maintainType,vehicleModelId) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: 'maintainPlan/queryAll',
                params: {
                    'maintainType': maintainType,
                    'vehicleModelId':vehicleModelId
                }
            }).success(function(response) {
                    deferred.resolve(response);
                }).error(function(response) {
                    deferred.reject(response);
                });
            return deferred.promise;
        },
        save : function(maintainPlan) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'maintainPlan/save',
                data: maintainPlan
            }).success(function(response) {
                    deferred.resolve(response);
                }).error(function(response) {
                    deferred.reject(response);
                });
            return deferred.promise;
        },
        saveDimensionWeight: function(dimensionWeight) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'dimensionWeight/save',
                data: dimensionWeight
            }).success(function(response) {
                    deferred.resolve(response);
                }).error(function(response) {
                    deferred.reject(response);
                });
            return deferred.promise;
        },
        updateDimensionRatio: function(dimensionRatio) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'dimensionRatio/save',
                data: dimensionRatio
            }).success(function(response) {
                    deferred.resolve(response);
                }).error(function(response) {
                    deferred.reject(response);
                });
            return deferred.promise;
        },
        saveRelateComponent : function(relateComponent) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'relateComponent/save',
                data: relateComponent
            }).success(function(response) {
                    deferred.resolve(response);
                }).error(function(response) {
                    deferred.reject(response);
                });
            return deferred.promise;
        },

//        save: function(maintainPlan) {
//            var deferred = $q.defer();
//            $http({
//                method: 'POST',
//                url: 'maintainPlan/save',
//                data: maintainPlan
//            }).success(function(response) {
//                    deferred.resolve(response);
//                }).error(function(response) {
//                    deferred.reject(response);
//                });
//            return deferred.promise;
//        },
        update : function(maintainPlan) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'maintainPlan/update',
                data: maintainPlan
            }).success(function(response) {
                    deferred.resolve(response);
                }).error(function(response) {
                    deferred.reject(response);
                });
            return deferred.promise;
        },
        remove : function(id) {
            var deferred = $q.defer();
            $http({
                method: 'DELETE',
                url: 'maintainPlan/remove',
                params: {
                    'id': id
                }
            }).success(function(response) {
                    deferred.resolve(response);
                }).error(function(response) {
                    deferred.reject(response);
                });
            return deferred.promise;
        },
        getModelList : function() {
        	var deferred = $q.defer();
            $http({
                method: 'GET',
                url: 'vehicleModel/getModelList',
                params: {
                }
            }).success(function(response) {
                    deferred.resolve(response);
                }).error(function(response) {
                    deferred.reject(response);
                });
            return deferred.promise;
        },

        removeDimensionWeight: function(id) {
            var deferred = $q.defer();
            $http({
                method: 'DELETE',
                url: 'dimensionWeight/remove',
                params: {
                    'id': id
                }
            }).success(function(response) {
                    deferred.resolve(response);
                }).error(function(response) {
                    deferred.reject(response);
                });
            return deferred.promise;
        },

        removeRelateComponent: function(id) {
            var deferred = $q.defer();
            $http({
                method: 'DELETE',
                url: 'relateComponent/remove',
                params: {
                    'id': id
                }
            }).success(function(response) {
                    deferred.resolve(response);
                }).error(function(response) {
                    deferred.reject(response);
                });
            return deferred.promise;
        },
        initVehicleModel:function(){
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: 'vehicleModel/queryAll'
            }).success(function(response) {
                    deferred.resolve(response);
                }).error(function(response) {
                    deferred.reject(response);
                });
            return deferred.promise;
        },
        initComponent:function(){
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: 'component/queryParent'
            }).success(function(response) {
                    deferred.resolve(response);
                }).error(function(response) {
                    deferred.reject(response);
                });
            return deferred.promise;
        },
        initComponent2:function(parentId){
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: 'component/queryComponent',
                params: {
                    'parentId': parentId
                }
            }).success(function(response) {
                    deferred.resolve(response);
                }).error(function(response) {
                    deferred.reject(response);
                });
            return deferred.promise;
        },

        queryPlanDimensions:function(planId){
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: 'dimensionWeight/queryPlanDimension',
                params: {
                    'planId': planId
                }
            }).success(function(response) {
                    deferred.resolve(response);
                }).error(function(response) {
                    deferred.reject(response);
                });
            return deferred.promise;
        } ,
        queryDimensionRatios:function(dimensionWeightId){
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: 'dimensionRatio/queryDimensionRatio',
                params: {
                    'dimensionWeightId': dimensionWeightId
                }
            }).success(function(response) {
                    deferred.resolve(response);
                }).error(function(response) {
                    deferred.reject(response);
                });
            return deferred.promise;
        },

        queryRelateComponents:function(planId){
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: 'relateComponent/queryRelateComponent',
                params: {
                    'planId': planId
                }
            }).success(function(response) {
                    deferred.resolve(response);
                }).error(function(response) {
                    deferred.reject(response);
                });
            return deferred.promise;
        },
        initDimension:function(){
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: 'dimension/queryParent'
            }).success(function(response) {
                    deferred.resolve(response);
                }).error(function(response) {
                    deferred.reject(response);
                });
            return deferred.promise;
        },
        queryComponents:function(planId,modelId){
        	var deferred = $q.defer();
            $http({
                method: 'GET',
                url: 'maintainPlan/queryComponent',
                params: {
                    'planId': planId,
                    'modelId': modelId
                }
            }).success(function(response) {
                    deferred.resolve(response);
                }).error(function(response) {
                    deferred.reject(response);
                });
            return deferred.promise;
        },
        removeComponent: function(id) {
            var deferred = $q.defer();
            $http({
                method: 'DELETE',
                url: 'maintainPlan/removeComponent',
                params: {
                    'id': id
                }
            }).success(function(response) {
                    deferred.resolve(response);
                }).error(function(response) {
                    deferred.reject(response);
                });
            return deferred.promise;
        },
        addComponent: function(planId,modelId,code,name) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'maintainPlan/addComponent',
                params: {
                	'planId' : planId,
                	'modelId' : modelId,
                	'code' : code,
                	'name' : name
                }
            }).success(function(response) {
                    deferred.resolve(response);
                }).error(function(response) {
                    deferred.reject(response);
                });
            return deferred.promise;
        }
    };
});