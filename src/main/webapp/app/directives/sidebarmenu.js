angular.module('app').factory('SidebarMenuFactory', function($http, $q) {
	return {
		getAll : function() {
			var deferred = $q.defer();	// 声明延后执行，表示要去监控后面的执行
			$http.get('menu/getAllByAuthority').success(function(response) {
				deferred.resolve(response);	// 声明执行成功，即http请求数据成功，可以返回数据了
			}).error(function(response) {
				deferred.reject(response); // 声明执行失败，即服务器返回错误
			});
			return deferred.promise;	// 返回承诺，这里并不是最终数据，而是访问最终数据的API
		}
	};
});

angular.module('app').directive('sidebarMenuTree', function($compile, SidebarMenuFactory) {
	return {
		restrict : 'A',
		link : function(scope, iElement, iAttrs) {
			var promise = SidebarMenuFactory.getAll();	// 同步调用，获得承诺接口 
			promise.then(function(data) { // 调用承诺API获取数据 .resolve
				var menuList = data.subSidebarMenuList;
				for(var i=0;i<menuList.length;i++) {
					scope.appendHTML(menuList[i], scope, iElement);
				}
				
			}, function(data) { // 处理错误 .reject
			});
			
			scope.appendHTML = function(menu, scope, iElement){
				if(menu.isLeaf == 1) {//叶子节点
					var html = '<li ui-sref-active="active" class="active">' +
			        '<a ui-sref="' + menu.uiSref + '">' + 
		            '<i class="' + menu.iclass + '"></i>' + 
		            '<span class="menu-text">' + menu.menuText + '</span>' + 
		            '</a>' + 
		            '</li>';
					var el=$compile(html)(scope);
					iElement.append(el);
				}else {
					var html = '<li>' + 
			        '<a href="#" class="menu-dropdown">' + 
		            '<i class="' + menu.iclass + '"></i>' + 
		            '<span class="menu-text">' + menu.menuText + '</span>' + 
		            '<i class="menu-expand"></i>' + 
		            '</a>' + 
		            '<ul class="submenu" id="submenu' + menu.id + '">' + 
		            '</ul>' + 
		            '</li>';
					//var el=$compile(html)(scope);
					//elem.find('#submenu').append(el);
					var el=$compile(html)(scope);
					iElement.append(el);
					
					var list = menu.subSidebarMenuList;
					for(var i=0; i<list.length; i++) {
						scope.appendHTML(list[i], scope, iElement.find('#submenu' + menu.id));
					}
				}
			}
		}
	};
});
