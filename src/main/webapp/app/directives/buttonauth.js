angular.module('app').factory('ButtonAuthFactory', function($http, $q) {
	return {
		checkButton : function(url) {
			var deferred = $q.defer();	// 声明延后执行，表示要去监控后面的执行
			$http({
				method: 'GET',
				url: 'checkauth/button',
				params: {
					'url': url
				}
			}).success(function(response) {
				deferred.resolve(response);	// 声明执行成功，即http请求数据成功，可以返回数据了
			}).error(function(response) {
				deferred.reject(response); // 声明执行失败，即服务器返回错误
			});
			return deferred.promise;	// 返回承诺，这里并不是最终数据，而是访问最终数据的API
		}
	};
});

angular.module('app').directive('checkButtonAuth', function(ButtonAuthFactory) {
	return {
		restrict : 'A',
		link : function(scope, iElement, iAttrs) {
			var url = iAttrs.checkButtonAuth;
			var promise = ButtonAuthFactory.checkButton(url);	// 同步调用，获得承诺接口 
			promise.then(function(data) { // 调用承诺API获取数据 .resolve
				if(data.message == 'not authorized') {
					iElement.hide();
				}
			}, function(data) { // 处理错误 .reject
			});
		}
	};
});
