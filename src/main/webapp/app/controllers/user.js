app.controller('UserCtrl', function (
    $scope, $http, $interval, $q, $modal, $log, $timeout, uiGridConstants, UserService) {

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

    $scope.open = function (windowClass, templateUrl, mode) {
        var modalTitle = '', modalAction = '';
        var showPassword = true;
        if(mode == 'edit') {
            if(!$scope.userCurrent.id) {
                alert('no user selected');
                return;
            }
            modalTitle = '编辑用户'; modalAction = '保存';
            showPassword = false;
        }
        else if(mode == 'add') {
            $scope.gridApi.selection.clearSelectedRows();
            $scope.userCurrent = {};
            $scope.userCurrentRoles = [];
            $scope.userCurrentRolesExclude = [];
            modalTitle = '注册用户'; modalAction = '保存';
        }
        else {
            alert('wrong mode');
            return;
        }

        var myModal = $modal.open({
            backdrop: false,
            windowClass: windowClass,
            templateUrl: templateUrl,
            controller: 'SaveOrUpdateModalCtrl',
            resolve: {//传值给小页面，因为小页面是隔离作用域，必须采用这种方式
                userNow: function () {
                    return $scope.userCurrent;
                },
                modalTitle: function () {
                    return modalTitle;
                },
                modalAction: function () {
                    return modalAction;
                },
                showPassword: function () {
                	return showPassword;
                }
            }
        });

        myModal.result.then(function (userCurrent) {
            if(mode == 'edit') {
            	UserService.update(userCurrent).then(
                    function (res) {
                    	$scope.queryAll();
                    },
                    function (err) {
                    }
                );
                angular.copy(userCurrent, $scope.userCurrent);
            }
            if(mode == 'add') {
            	UserService.save(userCurrent).then(
                    function (res) {
                        $scope.queryAll();
                    },
                    function (err) {
                    }
                );
            }
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.queryAll = function () {
        return UserService.queryAll().then(
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
    
    $scope.openAuthority = function (windowClass, templateUrl) {
        var modalTitle = '';

        if(!$scope.userCurrent.id) {
            alert('no user selected');
            return;
        }
        modalTitle = '角色分配';

        var myModal = $modal.open({
            backdrop: false,
            windowClass: windowClass,
            templateUrl: templateUrl,
            controller: 'AuthorityModalCtrl',
            resolve: {
            	userNow: function () {
                    return $scope.userCurrent;
                },
                modalTitle: function () {
                    return modalTitle;
                },
                currentRoles: function () {
                	return $scope.userCurrentRoles;
                },
                currentRolesExclude: function () {
                	return $scope.userCurrentRolesExclude;
                }
            }
        });

        myModal.result.then(function (param) {
        	UserService.handleRoles(param).then(
                function (res) {
                	$scope.queryUserRoles($scope.userCurrent.id);
                    $scope.queryUserRolesExclude($scope.userCurrent.id);
                },
                function (err) {
                }
            );
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    
    $scope.queryUserRoles = function (userId) {
        return UserService.queryUserRoles(userId).then(
            function (res) {
            	$scope.userCurrentRoles = res;
            },
            function (err) {
            }
        );
    };
    $scope.queryUserRolesExclude = function (userId) {
        return UserService.queryUserRolesExclude(userId).then(
            function (res) {
            	$scope.userCurrentRolesExclude = res;
            },
            function (err) {
            }
        );
    };

});

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

app.controller('AuthorityModalCtrl', function ($scope, $modalInstance, userNow, modalTitle, currentRoles, currentRolesExclude) {
    $scope.modalTitle = modalTitle;
    $scope.currentRoles = currentRoles;//用户已经有的权限
    $scope.currentRolesExclude = currentRolesExclude;
    
    $scope.ok = function () {
    	var oList2=document.getElementById("oListbox2");
    	var selectedRoles='';
    	var userId=userNow.id;
    	for(var i=0;i<oList2.options.length;i++) {
    		selectedRoles=selectedRoles+oList2.options[i].value.split(':')[1]+',';
        }
        $modalInstance.close(userId + ":" + selectedRoles);
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
    
});
