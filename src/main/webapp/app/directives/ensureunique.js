app.directive('ensureUnique', function($http) {
	return {
		require : 'ngModel',
		scope : {
			ensureUniqueData: '='
		},
		link : function(scope, ele, attrs, c) {
			ele.bind('blur', function(evt) {
				if(c.$modelValue != undefined) {
					$http({
						method: 'POST',
						url: 'checkUnique/' + attrs.ensureUnique,
						data: scope.ensureUniqueData
					}).success(function(data) {
						c.$setValidity('unique', data.unique);
					})
				}
			});
		}
	};
});