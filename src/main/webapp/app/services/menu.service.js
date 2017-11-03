angular.module('app').factory('MenuFactory', function($http, $q) {
	return {
		authorizeMenu2Role : function(roleId, menuIds) {
			var deferred = $q.defer();
			$http({
				method: 'POST',
				url: 'zTree/authorizeMenu2Role',
				params: {
					'roleId' : roleId,
					'menuIds' : menuIds
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