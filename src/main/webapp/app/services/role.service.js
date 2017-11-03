'use strict';
angular.module('app').factory('RoleService', function($http, $q) {
	return {
		queryAll : function() {
			var deferred = $q.defer();
			$http({
				method: 'GET',
				url: 'role/queryAll'
			}).success(function(response) {
				deferred.resolve(response);
			}).error(function(response) {
				deferred.reject(response);
			});
			return deferred.promise;
		},
		queryByCondition : function(currentPage, currentPageSize, roleCodeFilter, roleNameFilter, roleCodeSort, roleNameSort) {
			var deferred = $q.defer();
			$http({
				method: 'GET',
				url: 'role/queryByCondition',
				params: {
					'currentPage' : currentPage,
					'currentPageSize' : currentPageSize,
					'roleCodeFilter' : roleCodeFilter,
					'roleNameFilter' : roleNameFilter,
					'roleCodeSort' : roleCodeSort,
					'roleNameSort' : roleNameSort
				}
			}).success(function(response) {
				deferred.resolve(response);
			}).error(function(response) {
				deferred.reject(response);
			});
			return deferred.promise;
		},
		queryTotalItems : function(roleCodeFilter, roleNameFilter) {
			var deferred = $q.defer();
			$http({
				method: 'GET',
				url: 'role/queryTotalItems',
				params: {
					'roleCodeFilter' : roleCodeFilter,
					'roleNameFilter' : roleNameFilter
				}
			}).success(function(response) {
				deferred.resolve(response);
			}).error(function(response) {
				deferred.reject(response);
			});
			return deferred.promise;
		},
		save : function(role) {
			var deferred = $q.defer();
			$http({
				method: 'POST',
				url: 'role/save',
				data: role
			}).success(function(response) {
				deferred.resolve(response);
			}).error(function(response) {
				deferred.reject(response);
			});
			return deferred.promise;
		},
		update : function(role) {
			var deferred = $q.defer();
			$http({
				method: 'POST',
				url: 'role/update',
				data: role
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
				url: 'role/remove',
				params: {
					'id': id
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