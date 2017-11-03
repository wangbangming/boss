app.controller('RoleCtrl', function (
    $scope, $http, $interval, $q, $modal, $log, $timeout, uiGridConstants, RoleService) {

    $scope.roleCurrent = {};
    
    var currentPage = 1;
    var currentPageSize = 10;
    
    var roleCodeFilter = '';
    var roleNameFilter = '';
    
    var roleCodeSort = '';
    var roleNameSort = '';

    $scope.gridOptions = {
        columnDefs: [
            {name: 'roleCode', displayName: "角色编码"},
            {name: 'roleName', displayName: "角色名"}
        ],
        paginationPageSizes: [10],
        paginationPageSize: 10,
        useExternalPagination: true,
        
        multiSelect: false,
        enableRowSelection: true,
        enableRowHeaderSelection: true,
        enableColumnMenus: true,
        
        enableSorting: true,
        useExternalSorting: true,
        
        enableFiltering: true,
        useExternalFiltering: true,
        
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                if(row.isSelected) {
                    $scope.roleCurrent = row.entity;
                }
                else {
                    $scope.roleCurrent = {};
                }
            });
            gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                $scope.gridApi.selection.clearSelectedRows();
                $scope.roleCurrent = {};
                
                currentPage = newPage;
                currentPageSize = pageSize;
                
                $scope.queryByCondition(currentPage, currentPageSize, roleCodeFilter, roleNameFilter, roleCodeSort, roleNameSort);
            });
            $scope.gridApi.core.on.filterChanged( $scope, function() {
            	var grid = this.grid;
            	roleCodeFilter = (grid.columns[1].filters[0].term != undefined ? grid.columns[1].filters[0].term : '');
            	roleNameFilter = (grid.columns[2].filters[0].term != undefined ? grid.columns[2].filters[0].term : '');
            	
            	currentPage = 1;
            	grid.api.pagination.seek(1);//回到第一页
            	$scope.queryByCondition(currentPage, currentPageSize, roleCodeFilter, roleNameFilter, roleCodeSort, roleNameSort);
            });
            $scope.gridApi.core.on.sortChanged( $scope, function ( grid, sortColumns ) {
            	roleCodeSort = '';
                roleNameSort = '';//先初始化下再赋值
            	for(var i=0;i<sortColumns.length;i++) {
            		if(sortColumns[i].field == 'roleCode') {
            			roleCodeSort = sortColumns[i].sort.direction;
            		}else if(sortColumns[i].field == 'roleName') {
            			roleNameSort = sortColumns[i].sort.direction;
            		}
            	}
            	
            	currentPage = 1;
            	grid.api.pagination.seek(1);//回到第一页
            	$scope.queryByCondition(currentPage, currentPageSize, roleCodeFilter, roleNameFilter, roleCodeSort, roleNameSort);
            });
        }
    };

    $scope.open = function (windowClass, templateUrl, mode) {
        var modalTitle = '', modalAction = '';
        if(mode == 'edit') {
            if(!$scope.roleCurrent.id) {
                alert('no role selected');
                return;
            }
            modalTitle = '编辑角色'; modalAction = '保存';
        }
        else if(mode == 'add') {
            $scope.gridApi.selection.clearSelectedRows();
            $scope.roleCurrent = {};
            modalTitle = '注册角色'; modalAction = '保存';
        }
        else {
            alert('wrong mode');
            return;
        }

        var myModal = $modal.open({
            backdrop: false,
            windowClass: windowClass,
            templateUrl: templateUrl,
            controller: 'ModalContentCtrl',
            resolve: {//传值给小页面，因为小页面是隔离作用域，必须采用这种方式
                roleNow: function () {
                    return $scope.roleCurrent;
                },
                modalTitle: function () {
                    return modalTitle;
                },
                modalAction: function () {
                    return modalAction;
                }
            }
        });

        myModal.result.then(function (roleCurrent) {
            if(mode == 'edit') {
            	RoleService.update(roleCurrent).then(
                    function (res) {
                    	//$scope.queryAll();
                    	$scope.queryByCondition(currentPage, currentPageSize, roleCodeFilter, roleNameFilter, roleCodeSort, roleNameSort);
                    },
                    function (err) {
                    }
                );
                angular.copy(roleCurrent, $scope.roleCurrent);
            }
            if(mode == 'add') {
            	RoleService.save(roleCurrent).then(
                    function (res) {
                        //$scope.queryAll();
                    	$scope.queryByCondition(currentPage, currentPageSize, roleCodeFilter, roleNameFilter, roleCodeSort, roleNameSort);
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
        return RoleService.queryAll().then(
            function (res) {
                $scope.gridOptions.data = res;
            },
            function (err) {
            }
        );
    };
    
    $scope.queryByCondition = function (currentPage, currentPageSize, roleCodeFilter, roleNameFilter, roleCodeSort, roleNameSort) {
    	return RoleService.queryByCondition(currentPage, currentPageSize, roleCodeFilter, roleNameFilter, roleCodeSort, roleNameSort)
    	.then(
            function (res) {
                $scope.gridOptions.data = res;
                
                $scope.queryTotalItems(roleCodeFilter, roleNameFilter);//后台分页时需要指定totalItems
            },
            function (err) {
            }
        );
    };
    
    $scope.queryTotalItems = function(roleCodeFilter, roleNameFilter) {
    	return RoleService.queryTotalItems(roleCodeFilter, roleNameFilter).then(
            function (res) {
            	$scope.gridOptions.totalItems = res.count;//后台分页时需要指定totalItems
            },
            function (err) {
            }
        );
    };
    
    var checkCurrentSelected = function() {
        if(!$scope.roleCurrent.id) {
            alert('请选择一行数据');
            return false;
        }
        return true;
    };

    $scope.removeLine = function () {
        if(!checkCurrentSelected()) {return false;}
        if(!confirm('确定删除？')) {return false;}
        RoleService.remove($scope.roleCurrent.id).then(
            function (res) {
                //$scope.queryAll();
            	$scope.queryByCondition(currentPage, currentPageSize, roleCodeFilter, roleNameFilter, roleCodeSort, roleNameSort);
                alert('已删除');
            },
            function (err) {
            }
        );
    };

    //$scope.queryAll();
    $scope.queryByCondition(currentPage, currentPageSize, roleCodeFilter, roleNameFilter, roleCodeSort, roleNameSort);

});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.
app.controller('ModalContentCtrl', function ($scope, $modalInstance, RoleService, roleNow, modalTitle, modalAction) {
    $scope.modalTitle = modalTitle;
    $scope.modalAction = modalAction;
    $scope.role = {};
    angular.copy(roleNow, $scope.role);
    $scope.ok = function () {
        if ($scope.form.$valid) {
    		$modalInstance.close($scope.role);
		} else {
			$scope.form.submitted = true;
		}
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});
