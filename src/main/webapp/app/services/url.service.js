angular.module('app').factory('UrlFactory', function($http, $q) {
	return {
		authorizeUrl2Role : function(roleId, urlIds) {
			var deferred = $q.defer();
			$http({
				method: 'POST',
				url: 'zTree/authorizeUrl2Role',
				params: {
					'roleId' : roleId,
					'urlIds' : urlIds
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