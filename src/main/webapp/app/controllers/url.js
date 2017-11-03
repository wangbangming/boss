app.controller('UrlCtrl', function ($scope, UrlFactory){
	$scope.authorizeUrl2Role = function() {
		var urlTree = $.fn.zTree.getZTreeObj("urlTree");
		var urlTreeNodes = urlTree.getCheckedNodes(true);
		
		var roleTree = $.fn.zTree.getZTreeObj("roleTree");
		var roleTreeNodes = roleTree.getCheckedNodes(true);
		
		if(urlTreeNodes.length == 0 || roleTreeNodes.length == 0) {
			alert('请选择角色和URL');
			return false;
		}
		
		var roleId = roleTreeNodes[0].id;
		var urlIds = '';
		for(var i=0;i<urlTreeNodes.length;i++) {
			urlIds += urlTreeNodes[i].id + ',';
		}
		
		UrlFactory.authorizeUrl2Role(roleId, urlIds).then(function(data) {
			alert('操作成功!');
		}, function(data) {
		});
	}
	
});