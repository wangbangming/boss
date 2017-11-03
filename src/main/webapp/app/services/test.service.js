'use strict';
angular.module('app').factory('TestService', function($http, $q) {
	return {
		queryAll : function() {
			var deferred = $q.defer();
			$http({
				method: 'GET',
				url: 'user/queryAll'
			}).success(function(response) {
				deferred.resolve(response);
			}).error(function(response) {
				deferred.reject(response);
			});
			return deferred.promise;
		},
		save : function(user) {
			var deferred = $q.defer();
			$http({
				method: 'POST',
				url: 'user/save',
				data: user
			}).success(function(response) {
				deferred.resolve(response);
			}).error(function(response) {
				deferred.reject(response);
			});
			return deferred.promise;
		},
		update : function(user) {
			var deferred = $q.defer();
			$http({
				method: 'POST',
				url: 'user/update',
				data: user
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
				url: 'user/remove',
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
		queryUserRoles : function(userId) {
			var deferred = $q.defer();
			$http({
				method: 'GET',
				url: 'user/queryUserRoles',
				params: {
					'userId': userId
				}
			}).success(function(response) {
				deferred.resolve(response);
			}).error(function(response) {
				deferred.reject(response);
			});
			return deferred.promise;
		},
		queryUserRolesExclude : function(userId) {
			var deferred = $q.defer();
			$http({
				method: 'GET',
				url: 'user/queryUserRolesExclude',
				params: {
					'userId': userId
				}
			}).success(function(response) {
				deferred.resolve(response);
			}).error(function(response) {
				deferred.reject(response);
			});
			return deferred.promise;
		},
		handleRoles : function(param) {
			var deferred = $q.defer();
			$http({
				method: 'POST',
				url: 'user/handleRoles',
				params: {
					'userId': param.split(':')[0],
					'selectedRoles': param.split(':')[1]
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