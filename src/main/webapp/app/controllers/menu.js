app.controller('MenuCtrl', function ($scope, MenuFactory){
	$scope.authorizeMenu2Role = function() {
		var menuTree = $.fn.zTree.getZTreeObj("menuTree");
		var menuTreeNodes = menuTree.getCheckedNodes(true);
		
		var roleTree = $.fn.zTree.getZTreeObj("roleTree");
		var roleTreeNodes = roleTree.getCheckedNodes(true);
		
		if(menuTreeNodes.length == 0 || roleTreeNodes.length == 0) {
			alert('请选择角色和菜单');
			return false;
		}
		
		var roleId = roleTreeNodes[0].id;
		var menuIds = '';
		for(var i=0;i<menuTreeNodes.length;i++) {
			menuIds += menuTreeNodes[i].id + ',';
		}
		
		MenuFactory.authorizeMenu2Role(roleId, menuIds).then(function(data) {
			alert('操作成功!');
		}, function(data) {
		});
	}
	
});