app.controller('TestCtrl', function (
    $scope, $http, $interval, $q, $modal, $log, $timeout, uiGridConstants, TestService) {

    $scope.userCurrent = {};
    $scope.userCurrentRoles = [];
    $scope.userCurrentRolesExclude = [];

    $scope.gridOptions = {
        columnDefs: [
            {name: 'account', displayName: "账号"},
            {name: 'userName', displayName: "用户名"},
            {name: 'mobilePhone', displayName: "手机号"},
            {name: 'officePhone', displayName: "办公电话"},
            {name: 'email', displayName: "邮箱"}
        ],
        paginationPageSizes: [10],
        paginationPageSize: 10,
        multiSelect: false,
        enableRowSelection: true,
        enableRowHeaderSelection: true,
        enableColumnMenus: true,
        enableSorting: true,
        enableFiltering: true,
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                if(row.isSelected) {
                    $scope.userCurrent = row.entity;
                    $scope.queryUserRoles($scope.userCurrent.id);
                    $scope.queryUserRolesExclude($scope.userCurrent.id);
                }
                else {
                    $scope.userCurrent = {};
                    $scope.userCurrentRoles = [];
                    $scope.userCurrentRolesExclude = [];
                }
            });
            gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                $scope.gridApi.selection.clearSelectedRows();
                $scope.userCurrent = {};
                $scope.userCurrentRoles = [];
                $scope.userCurrentRolesExclude = [];
            });
        }
    };

   

    $scope.queryAll = function () {
        return TestService.queryAll().then(
            function (res) {
                $scope.gridOptions.data = res;
            },
            function (err) {
            }
        );
    };

    var checkCurrentSelected = function() {
        if(!$scope.userCurrent.id) {
            alert('请选择一行数据');
            return false;
        }
        return true;
    };

    $scope.removeLine = function () {
        if(!checkCurrentSelected()) {return false;}
        if(!confirm('确定删除？')) {return false;}
        UserService.remove($scope.userCurrent.id).then(
            function (res) {
                $scope.queryAll();
                alert('已删除');
            },
            function (err) {
            }
        );
    };

    $scope.queryAll();
    
   

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.
app.controller('SaveOrUpdateModalCtrl', function ($scope, $modalInstance, UserService, userNow, modalTitle, modalAction, showPassword) {
    $scope.modalTitle = modalTitle;
    $scope.modalAction = modalAction;
    $scope.showPassword = showPassword;
    $scope.user = {};
    angular.copy(userNow, $scope.user);
    $scope.ok = function () {
        if ($scope.form.$valid) {
    		$modalInstance.close($scope.user);
		} else {
			$scope.form.submitted = true;
		}
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});


    
});
