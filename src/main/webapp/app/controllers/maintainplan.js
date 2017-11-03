app.controller('MaintainPlanCtrl', function (
    $scope, $http, $interval, $q, $modal, $log, $timeout, uiGridConstants, MaintainPlanService) {

    $scope.maintainPlanCurrent = {};
    $scope.maintainPlanCurrentStatus = null;
    $scope.vehicleModels = [];
//    $scope.vehicleModelCurrent = {};
    $scope.gridOptions = {
        columnDefs: [
            {name: 'planName', displayName: "计划名称"},
            {name: 'maintainMileage', displayName: "建议保养里程"},
            {name: 'maintainTime', displayName: "建议保养时间"},
            {name: 'status', displayName: "计划状态"}
        ],
        paginationPageSizes: [10],
        paginationPageSize: 10,
        multiSelect: false,
        enableRowSelection: true,
        enableRowHeaderSelection: true,
        enableColumnMenus: true,
//        enableSorting: true, 框架会根据char来排序，但是会出现14>105的现象，修改可以参考role.js
//        enableFiltering: true,
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                var FT = 'rowSelectionChanged - '; $log.info(FT);
                $log.log(FT, 'row:', row);
                if(row.isSelected) {
                    $scope.maintainPlanCurrent = row.entity;
                    $scope.maintainPlanCurrentStatus = $scope.maintainPlanCurrent.status;
                }
                else {
                    $scope.maintainPlanCurrent = {};
                    $scope.maintainPlanCurrentStatus = null;
                }
                $log.log('$scope.maintainPlanCurrent:', $scope.maintainPlanCurrent);
                $log.log('$scope.maintainPlanCurrentStatus:', $scope.maintainPlanCurrentStatus);
            });
            gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                var FT = 'paginationChanged - '; $log.info(FT);
                $log.log(FT, 'newPage:', newPage);
                $scope.gridApi.selection.clearSelectedRows();
                $scope.maintainPlanCurrent = {};
            });
        }
    };

    /*$http.get('rest/maintainPlans').success(function (data) {
     $scope.gridOptions.data = data;
     });*/

    $scope.search = function (maintainType,vehicleModel) {
    	$scope.maintainPlanCurrent.id = null;
        return MaintainPlanService.queryMaintainPlans(maintainType,vehicleModel).then(
            function (res) {
                $scope.gridOptions.data = res;
            },
            function (err) {
                alert(err.data.message);
            }
        );
    };
    $scope.initVehicleModel = function(){
        return MaintainPlanService.initVehicleModel().then(
            function (res) {
                $scope.vehicleModels = res;
            },
            function (err) {
                alert(err.data.message);
            }
        );
    };
    var checkCurrentSelected = function() {
        if(!$scope.maintainPlanCurrent.id) {
            alert('请选择一行数据');
            return false;
        }
        $log.log('$scope.supplierCurrent:', $scope.supplierCurrent);
        return true;
    };
    $scope.remove = function () {
        var FT = 'removeLine - '; $log.info(FT);
        if(!checkCurrentSelected()) {return false;}
        if(!confirm('确定删除？')) {return false;}
        MaintainPlanService.remove($scope.maintainPlanCurrent.id).then(
            function (res) {
                $scope.search(1,$scope.vehicleModel.vehicleModelId);
                alert('已删除');
            },
            function (err) {
            }
        );
    };

    $scope.getModelList = function () {
        if(!confirm('确定更新车型信息？')) {return false;}
        MaintainPlanService.getModelList().then(
            function (res) {
                alert('已更新'+res+'条车型信息');
            },
            function (err) {
            	alert('更新失败');
            }
        );
    };

    $scope.showComponent = function (windowClass, templateUrl, mode) {
        if(!checkCurrentSelected()) {return false;}
        var modalTitle = '维护保养配件';

        var myModal = $modal.open({
            backdrop: false,
            windowClass: windowClass,
            templateUrl: templateUrl,
            controller: 'relateComponentCtrl',
            resolve: {
                modalTitle: function () {
                    return modalTitle;
                },
                planId:function(){
                    return $scope.maintainPlanCurrent.id;
                },
                modelId:function(){
                    return $scope.maintainPlanCurrent.vehicleModelId;
                }
            }
        });
    };

    $scope.open = function (windowClass, templateUrl, mode) {
        var modalTitle = '', modalAction = '';
       if(mode == 'add') {
            $scope.gridApi.selection.clearSelectedRows();
            $scope.maintainPlanCurrent = {};
            modalTitle = '新建保养计划'; modalAction = '保存';
        }
       else if(mode == 'edit'){
           if(!checkCurrentSelected()) {return false;}
           modalTitle = '编辑保养计划'; modalAction = '保存';
       }
       else {
            alert('wrong mode');
            return;
       }

        var myModal = $modal.open({
            backdrop: false,
            windowClass: windowClass,
            templateUrl: templateUrl,
            controller: 'maintainPlanModelCtrl',
            resolve: {
                maintainPlan: function () {
                    return $scope.maintainPlanCurrent;
                },
                modalTitle: function () {
                    return modalTitle;
                },
                modalAction: function () {
                    return modalAction;
                },
                mode:function(){
                    return mode;
                }
            }
        });

        myModal.result.then(function (maintainPlanCurrent) {
            if(mode == 'add') {
                $log.info('add...');
                MaintainPlanService.save(maintainPlanCurrent).then(
                    function (res) {
//                        $scope.queryAll();
                    },
                    function (err) {
                        alert(err.data.message);
                    }
                );
            }else if(mode == 'edit'){
                $log.info('edit...');
                MaintainPlanService.save(maintainPlanCurrent).then(
                    function (res) {
                    },
                    function (err) {
                    }
                );
                angular.copy(maintainPlanCurrent, $scope.maintainPlanCurrent);
            }
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.initVehicleModel();

});
app.controller('maintainPlanModelCtrl', function ($scope, $modalInstance, maintainPlan, modalTitle, modalAction, mode,MaintainPlanService) {
    $scope.modalTitle = modalTitle;
    $scope.modalAction = modalAction;
    $scope.maintainPlan = {};
    $scope.vehicleModels = [];

    angular.copy(maintainPlan, $scope.maintainPlan);
    $scope.ok = function () {
        if(isNaN($scope.maintainPlan.maintainMileage)){
           alert('推荐里程请填写数字');
           return false;
        }
    	if($scope.vehicleModel == undefined){
    		alert('请选择车型');
    		return false;
    	}
        if(mode=='add'){
            $scope.maintainPlan.vehicleModelId = $scope.vehicleModel.vehicleModelId;
        }
        $scope.maintainPlan.maintainType = 1;
        $modalInstance.close($scope.maintainPlan);
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
    $scope.initVehicleModel = function(){
        return MaintainPlanService.initVehicleModel().then(
            function (res) {
                $scope.vehicleModels = res;
            },
            function (err) {
                alert(err.data.message);
            }
        );
    };
    $scope.initVehicleModel();
});


app.controller('relateComponentCtrl', function ($scope, $http, $interval, $q, $modal, $log, $timeout, $modalInstance,uiGridConstants,modalTitle, planId,modelId,MaintainPlanService) {

    $scope.modalTitle = modalTitle;

    $scope.componentCurrent = {};
    $scope.componentCurrentStatus = null;
    $scope.planId = planId;
    $scope.modelId = modelId;
    $scope.gridComponent = {
        columnDefs: [
            {name: 'code', displayName: "配件代码"},
            {name: 'name', displayName: "配件名称"}
        ],
        paginationPageSizes: [10],
        paginationPageSize: 10,
        multiSelect: false,
        enableRowSelection: true,
        enableRowHeaderSelection: true,
        enableColumnMenus: true,
        enableSorting: true,
//        enableFiltering: true,
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                if(row.isSelected) {

                    $scope.componentCurrent = row.entity;
                    $scope.componentCurrentStatus = $scope.componentCurrent.status;
                }
                else {
                    $scope.componentCurrent = {};
                    $scope.componentCurrentStatus = null;
                }

            });
            gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                $scope.gridApi.selection.clearSelectedRows();
                $scope.componentCurrent = {};
            });
        }
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.search = function (planId) {
    	$scope.componentCurrent.id == null;
        return MaintainPlanService.queryComponents(planId,modelId).then(
            function (res) {
                $scope.planId = planId;
                $scope.modelId = modelId;
                $scope.gridComponent.data = res;
            },
            function (err) {
                alert(err.data.message);
            }
        );
    };
    var checkCurrentSelected = function() {
        if(!$scope.componentCurrent.id) {
            alert('请选择一行数据');
            return false;
        }
        return true;
    };

    $scope.addComponent= function () {
        var modalTitle = '添加配件';

        // 表格对象获取
        var obj = $scope.gridApi.grid;
        var length = obj.rows.length;
        for (var i = 0; i < length; i++){
        	if($scope.code == obj.rows[i].entity.code){
        		alert('已存在此配件代码');	
        		return false;
        	}
        }
        MaintainPlanService.addComponent(planId,modelId,$scope.code,$scope.name).then(
        		function (res) {
                    $scope.search($scope.planId);
                    alert('已添加');
                },
                function (err) {
                }
        		);
    };

    $scope.removeComponent = function(){
        if(!checkCurrentSelected()) {return false;}
        if(!confirm('确定删除？')) {return false;}
        MaintainPlanService.removeComponent($scope.componentCurrent.id).then(
            function (res) {
            	$scope.search(planId,modelId);
                alert('已删除');
            },
            function (err) {
            }
        );
    }
    $scope.search(planId,modelId);
});