angular.module('objectTable').controller('objectTableCtrl', ['$scope', '$timeout','$element', '$attrs','$http', '$compile', '$controller',
	function angTableCtrl($scope, $timeout, $element, $attrs, $http, $compile, $controller, objectTableSortingCtrl) {

		$controller('objectTableSortingCtrl', {$scope: $scope});
		var ctrl = this;

		this._init = function(){
			$scope.headers = [];
			$scope.fields = [];
			$scope.display = $scope.display || 5;
			$scope.paging = angular.isDefined($scope.paging) ? $scope.paging : true;
			$scope.sortingType = $scope.sortingType || "simple";
			$scope.currentPage = 0;
			$scope.customHeader = false;

			if($attrs.search =="separate"){
				$scope.search = "separate";
				$scope.columnSearch = [];

				/* ## after changing search model - clear currentPage ##*/
				$scope.$watch('columnSearch', function() {
					if(!!ctrl.pageCtrl)
						ctrl.pageCtrl.setPage(0);
				}, true);
			}else{
				/* 'separate' or 'true' or 'false '*/
				$scope.search = typeof($attrs.search)==='undefined' || $attrs.search==="true";
			}

			/* GET HEADERS */
			if(!$attrs.headers) throw "Required 'headers' attribute is not found!";
			var preHeaders = $attrs.headers.split(',');
			for (var i = 0,length=preHeaders.length; i <length; i++) {
				$scope.headers.push( preHeaders[i].trim() );
			}


			/* GET FIELDS */
			if(!$attrs.fields) throw "Sorting is allowed just with specified 'fields' attribute !";
			var preFields = $attrs.fields.split(',');
			for (i = 0,length=preFields.length; i <length; i++) {
				$scope.fields.push( preFields[i].trim() );
			}

			//LOAD FROM EXTERNAL URL
			if(!!$attrs.fromUrl){
				this._loadExternalData($attrs.fromUrl);
			}

			//reinitialize selected model
			$scope.selectedModel = $scope.select==="multiply"? []:{};
			
		};

		this._loadExternalData = function(url){
			$scope.dataIsLoading= true;
			$http.get(url).then(function(response){
				$scope.data = response.data;
				$scope.dataIsLoading = false;
			});
			
		};

		this._addHeaderPattern = function(node){
			$scope.customHeader = true;
			$element.find("table").prepend(node);
		};
		
		this._addFooterPattern = function(node){
			$element.find("table").prepend(node);
		};

		this._addRowPattern = function(node, rowFilter, paggingFilter){
			node = this._checkEditableContent(node);
			var tr = angular.element(node).find("tr");

			tr.attr("ng-repeat","item in $filtered = (data" + rowFilter + ")" + paggingFilter);
			if(!tr.attr("ng-click")){
				tr.attr("ng-click","setSelected(item)");
			}
			tr.attr("ng-class","{'selected-row':ifSelected(item)}");

			$element.find("table").append(node.outerHTML);
			$compile($element.find("tbody"))($scope);
		};

		this._checkEditableContent = function(node){
			var innerModel,findModelRegex=/\{\{:*:*(.*?)\}\}/g;
			Array.prototype.forEach.call(node.querySelectorAll("[editable]"), function(td){
				innerModel = td.innerHTML.replace(findModelRegex,'$1');
				td.innerHTML = "<span contentEditable ng-model='" +innerModel+ "'>{{" + innerModel + "}}</span>";
			});
			return node;
		};

		this.setCurrentPage = function(_currentPage){
			$scope.currentPage = _currentPage;
		};

		$scope.setSelected = function(item){
			if( $scope.select==="multiply"){
				if(!ctrl._containsInSelectArray(item)){
					$scope.selectedModel.push(item);
				}else{
					$scope.selectedModel.splice($scope.selectedModel.indexOf(item),1);
				}
			}else{
				$scope.selectedModel = item;
			}
		};

		this._containsInSelectArray = function(obj) {
			if($scope.selectedModel.length)
				return $scope.selectedModel.filter(function(listItem) {
					return angular.equals(listItem, obj);
				}).length > 0;
		};

		$scope.ifSelected = function(item){

			if( !!$scope.selectedModel && $scope.select==="multiply" ){
				return ctrl._containsInSelectArray(item);
			}else{
				return item.$$hashKey==$scope.selectedModel.$$hashKey;
			}
		};

		/* ## after changing search model - clear currentPage ##*/
		$scope.$watch('globalSearch',function(){
			if(!!ctrl.pageCtrl)
				ctrl.pageCtrl.setPage(0);
		});

	}]);