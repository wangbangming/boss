angular.module('app').factory('ZTreeFactory', function($http, $q) {
	return {
		loadNodes : function(zTreeUrl) {
			var deferred = $q.defer();
			$http({
				method: 'GET',
				url: 'zTree/' + zTreeUrl
			}).success(function(response) {
				deferred.resolve(response);
			}).error(function(response) {
				deferred.reject(response);
			});
			return deferred.promise;
		},
		loadNodesOnChecked : function(zTreeUrl, linkId) {
			var deferred = $q.defer();
			$http({
				method: 'GET',
				url: 'zTree/' + zTreeUrl + 'OnChecked',
				params: {
					'linkId': linkId
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

angular.module('app').directive('zTree', function(ZTreeFactory) {
	return {
		restrict : 'A',
		scope : {
			linkage : '='
		},
		link : function(scope, element, attrs) {
			var zTreeId = attrs.id;
			var zTreeUrl = attrs.zTree;

			ZTreeFactory.loadNodes(zTreeUrl).then(function(data) {
				$.fn.zTree.init(element, setting, data);
				$.fn.zTree.getZTreeObj(zTreeId).expandAll(true);
			}, function(data) {
			});
			
			var setting = {
				callback : {
					onCheck : function(event, treeId, treeNode) {
					}
				},
				check : {
					enable: true,
					chkStyle: "checkbox",
					chkboxType: { "Y": "ps", "N": "ps" }
				}
			};
			
			scope.$watch('linkage', function(newValue, oldValue) {
				if(newValue != undefined) {//过滤刚进页面
				    ZTreeFactory.loadNodesOnChecked(zTreeUrl, newValue.id).then(function(data) {
						$.fn.zTree.init(element, setting, data);
						$.fn.zTree.getZTreeObj(zTreeId).expandAll(true);
					}, function(data) {
					});
				}
			});
		}
	};
});

angular.module('app').directive('zTreeRadio', function(ZTreeFactory) {
	return {
		restrict : 'A',
		require: '?ngModel',
		link : function(scope, element, attrs, ngModel) {
			var zTreeId = attrs.id;
			var zTreeUrl = attrs.zTreeRadio;
			ZTreeFactory.loadNodes(zTreeUrl).then(function(data) {
				$.fn.zTree.init(element, setting, data);
			}, function(data) {
			});
			
			var setting = {
				callback : {
					onCheck : function(event, treeId, treeNode) {
						scope.$apply(function () {
							ngModel.$setViewValue(treeNode);
						});
					}
				},
				check : {
					enable: true,
					chkStyle: "radio",
					radioType: "all"
				}
			};
		}
	};
});