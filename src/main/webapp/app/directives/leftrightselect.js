app.directive('leftRightSelect', [function() {
	return {
		restrict : 'A',
		scope : {
			current : '=currentEntity',
			currentExclude : '=currentExcludeEntity',
			entityShow : '@',
			entityValue : '@'
		},
		template : 
			'<select id="oListbox1" style="width:250px;height:350px;"\
				ng-model="list1" multiple="multiple"\
				ng-options="entity.{{entityValue}} as entity.{{entityShow}} for entity in currentExclude">\
			</select>\
			<select id="oListbox2" style="width:250px;height:350px;"\
				ng-model="list2" multiple="multiple"\
				ng-options="entity.{{entityValue}} as entity.{{entityShow}} for entity in current">\
			</select>\
			<br>\
			<input type="button" value="<<删除" ng-click="R2L()">\
			<input type="button" value=">>分配" ng-click="L2R()">',
		link : function(scope, element, attrs) {
			var oList1=document.getElementById("oListbox1");
	        var oList2=document.getElementById("oListbox2");
			
			scope.L2R = function() {
				var arrOptions=new Array();
				if(oList1.options.length<=0) {
	                alert("左边已经没有了");
	                return;
	            }
	            for(var i=0;i<oList1.options.length;i++) {
	                if(oList1.options[i].selected) {
	                    //将当前选中的添加到数组中
	                    arrOptions.push(oList1.options[i]);
	                }
	            }
	            for(var i=0;i<arrOptions.length;i++) {
	                //循环把数组中的值添加的oList2
	                oList2.appendChild(arrOptions[i]);//这一步完成右边增加左边删除动作
	            }
			};
			scope.R2L = function() {
				var arrOptions=new Array();
				if(oList2.options.length<=0) {
	                alert("右边已经没有了");
	                return;
	            }
	            for(var i=0;i<oList2.options.length;i++) {
	                if(oList2.options[i].selected) {
	                    arrOptions.push(oList2.options[i]);    
	                }
	            }
	            for(var i=0;i<arrOptions.length;i++) {
	                oList1.appendChild(arrOptions[i]);
	            }
			}
		}
	};
}]);