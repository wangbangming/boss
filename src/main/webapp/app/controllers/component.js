app.controller('ComponentCtrl', function (
    $scope, $http, $interval, $q, $modal, $log, $timeout, uiGridConstants, MaintainPlanService) {

    $scope.maintainPlanCurrent = {};
    $scope.maintainPlanCurrentStatus = null;
    $scope.vehicleModels = [];
    $scope.components = [];
//    $scope.vehicleModelCurrent = {};
    $scope.gridOptions = {
        columnDefs: [
            {name: 'planName', displayName: "配件名称"},
            {name: 'code', displayName: "配件代码"},
            {name: 'componentType', displayName: "配件类型"},
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
//        enableSorting: true,
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
        if(!checkCurrentSelected()) {return false;}
        if(!confirm('确定删除？')) {return false;}
        MaintainPlanService.remove($scope.maintainPlanCurrent.id).then(
            function (res) {
                $scope.search(0,$scope.vehicleModel.vehicleModelId);
                alert('已删除');
            },
            function (err) {
            }
        );
    };
    $scope.show = function (windowClass, templateUrl, mode) {
        if(!checkCurrentSelected()) {return false;}
        var modalTitle = '关联维度';

        var myModal = $modal.open({
            backdrop: false,
            windowClass: windowClass,
            templateUrl: templateUrl,
            controller: 'dimensionWeightCtrl',
            resolve: {
                modalTitle: function () {
                    return modalTitle;
                },
                planId:function(){
                    return $scope.maintainPlanCurrent.id;
                },
                planName:function(){
                    return $scope.maintainPlanCurrent.code+$scope.maintainPlanCurrent.planName;

                }

            }
        });
    };


    $scope.showComponent = function (windowClass, templateUrl, mode) {
        if(!checkCurrentSelected()) {return false;}
        var modalTitle = '添加配件';

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
                parentId:function(){
                    return $scope.maintainPlanCurrent.code;
                }
            }
        });
    };

    $scope.open = function (windowClass, templateUrl, mode) {
        var modalTitle = '', modalAction = '';
        if(mode == 'add') {
            $scope.gridApi.selection.clearSelectedRows();
            $scope.maintainPlanCurrent = {};
            modalTitle = '新建保养配件'; modalAction = '保存';
        }
        else if(mode == 'edit'){
            if(!checkCurrentSelected()) {return false;}
            modalTitle = '编辑保养配件'; modalAction = '保存';
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
    $scope.componentTypes= ['保养配件','检测配件'];

    angular.copy(maintainPlan, $scope.maintainPlan);
    $scope.ok = function () {
        if(mode=='add'){
            $scope.maintainPlan.vehicleModelId = $scope.vehicleModel.vehicleModelId;
            $scope.maintainPlan.planName = $scope.component.componentName;
            $scope.maintainPlan.code = $scope.component.componentCode;
//            $scope.maintainPlan.componentType =$scope.componentType ;
        }
        $scope.maintainPlan.maintainType = 0;
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
    $scope.initComponent = function(){
        return MaintainPlanService.initComponent().then(
            function (res) {
                $scope.components = res;
            },
            function (err) {
                alert(err.data.message);
            }
        );
    };
    $scope.initComponent();
    $scope.initVehicleModel();
});

app.controller('dimensionWeightCtrl', function ($scope, $http, $interval, $q, $modal, $log, $timeout, $modalInstance,uiGridConstants,modalTitle,planId,planName, MaintainPlanService) {
    $scope.modalTitle = modalTitle+'-->'+planName;

    $scope.dimensionWeightCurrent = {};
    $scope.dimensionWeightCurrentStatus = null;
    $scope.planId = null;
//    $scope.vehicleModelCurrent = {};
    $scope.gridDimensionWeight = {
        columnDefs: [
//            {name: 'code', displayName: "配件代码"},
//            {name: 'planName', displayName: "配件名称"},
            {name: 'dimensionName', displayName: "关联维度"},
            {name: 'weight', displayName: "权重"}
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
                var FT = 'rowSelectionChanged - '; $log.info(FT);
                $log.log(FT, 'row:', row);
                if(row.isSelected) {
                    $scope.dimensionWeightCurrent = row.entity;
                    $scope.dimensionWeightCurrentStatus = $scope.dimensionWeightCurrent.status;
                }
                else {
                    $scope.dimensionWeightCurrent = {};
                    $scope.dimensionWeightCurrentStatus = null;
                }

            });
            gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                var FT = 'paginationChanged - '; $log.info(FT);
                $log.log(FT, 'newPage:', newPage);
                $scope.gridApi.selection.clearSelectedRows();
                $scope.dimensionWeightCurrent = {};
            });
        }
    };
    $scope.search = function (planId) {
    	$scope.dimensionWeightCurrent.id = null;
        return MaintainPlanService.queryPlanDimensions(planId).then(
            function (res) {
                $scope.planId = planId;
                $scope.gridDimensionWeight.data = res;
            },
            function (err) {
                alert(err.data.message);
            }
        );
    };
    var checkCurrentSelected = function() {
        if(!$scope.dimensionWeightCurrent.id) {
            alert('请选择一行数据');
            return false;
        }
        return true;
    };
    $scope.open= function (windowClass, templateUrl, mode) {
        var modalTitle = '', modalAction = '';
        if(mode == 'add') {
            $scope.gridApi.selection.clearSelectedRows();
            $scope.dimensionWeightCurrent = {};
            modalTitle = '新建维度'; modalAction = '保存';
        }
        else if(mode == 'edit'){
            if(!checkCurrentSelected()) {return false;}
            modalTitle = '编辑维度'; modalAction = '保存';
        }
        else {
            alert('wrong mode');
            return;
        }

        var myModal = $modal.open({
            backdrop: false,
            windowClass: windowClass,
            templateUrl: templateUrl,
            controller: 'dimensionWeightModalCtrl',
            resolve: {
                dimensionWeight:function(){
                    return $scope.dimensionWeightCurrent;
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
        myModal.result.then(function (dimensionWeightCurrent) {
            if(mode == 'add') {
                dimensionWeightCurrent.maintainPlanId = $scope.planId;
                MaintainPlanService.saveDimensionWeight(dimensionWeightCurrent).then(
                    function (res) {
                        $scope.search($scope.planId);
                    },
                    function (err) {
                        alert(err.data.message);
                    }
                );
            }else if(mode == 'edit'){
                MaintainPlanService.saveDimensionWeight(dimensionWeightCurrent).then(
                    function (res) {
                    },
                    function (err) {
                    }
                );
                angular.copy(dimensionWeightCurrent, $scope.dimensionWeightCurrent);
            }
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    $scope.remove = function(){
        if(!checkCurrentSelected()) {return false;}
        if(!confirm('确定删除？')) {return false;}
        MaintainPlanService.removeDimensionWeight($scope.dimensionWeightCurrent.id).then(
            function (res) {
                $scope.search($scope.planId);
                alert('已删除');
            },
            function (err) {
            }
        );
    };
    $scope.show = function(windowClass, templateUrl, mode){
        if(!checkCurrentSelected()) {return false;}
        var modalTitle = '维度系数';

        var myModal = $modal.open({
            backdrop: false,
            windowClass: windowClass,
            templateUrl: templateUrl,
            controller: 'dimensionRatioCtrl',
            resolve: {
                modalTitle: function () {
                    return modalTitle;
                },
                dimensionWeightId:function(){
                    return $scope.dimensionWeightCurrent.id;
                }

            }
        });
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
    $scope.search(planId);
});
app.controller('dimensionWeightModalCtrl', function ($scope, $http, $interval, $q, $modal, $log, $timeout,$modalInstance, uiGridConstants,dimensionWeight,modalTitle,modalAction,MaintainPlanService,mode) {
    $scope.modalTitle = modalTitle;
    $scope.modalAction = modalAction;
    $scope.dimensionWeight = {};
    angular.copy(dimensionWeight, $scope.dimensionWeight);
    $scope.dimensions= [];
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
    $scope.initDimension = function(){
        return MaintainPlanService.initDimension().then(
            function (res) {
                $scope.dimensions = res;
            },
            function (err) {
                alert(err.data.message);
            }
        );
    };

    $scope.ok = function () {
        if(mode=='add'){
            $scope.dimensionWeight.dimensionId =  $scope.dimension.id;
            $scope.dimensionWeight.dimensionName =  $scope.dimension.dimensionName;
        }
        $modalInstance.close($scope.dimensionWeight);
    };
    $scope.initDimension();

});
app.controller('dimensionRatioCtrl', function ($scope, $http, $interval, $q, $modal, $log, $timeout, $modalInstance,uiGridConstants,modalTitle,dimensionWeightId, MaintainPlanService) {

    $scope.modalTitle = modalTitle;

    $scope.dimensionRatioCurrent = {};
    $scope.dimensionRatioCurrentStatus = null;
    $scope.dimensionWeighId = dimensionWeightId;
    $scope.dimensionRatios = [];

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.search = function (dimensionWeightId) {
        return MaintainPlanService.queryDimensionRatios(dimensionWeightId).then(
            function (res) {
                $scope.dimensionWeightId = dimensionWeightId;
                $scope.dimensionRatios = res;
            },
            function (err) {
                alert(err.data.message);
            }
        );
    };

    $scope.saveAll = function(){
        angular.forEach($scope.dimensionRatios,function(dimensionRatio){
            MaintainPlanService.updateDimensionRatio(dimensionRatio).then(
                function (res) {
                },
                function (err) {
                    alert(err.data.message);
                }
            );
        });
//        alert($scope.dimensionRatios[0].ratioName);
//        alert($scope.dimensionRatios[0].ratio);
    };
    $scope.search(dimensionWeightId);
});

app.controller('relateComponentCtrl', function ($scope, $http, $interval, $q, $modal, $log, $timeout, $modalInstance,uiGridConstants,modalTitle, planId,parentId,MaintainPlanService) {

    $scope.modalTitle = modalTitle;

    $scope.relateComponentCurrent = {};
    $scope.relateComponentCurrentStatus = null;
    $scope.planId = planId;
    $scope.parentId = parentId;
    $scope.gridComponent = {
        columnDefs: [
            {name: 'componentCode', displayName: "配件代码"},
            {name: 'componentName', displayName: "配件名称"}
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

                    $scope.relateComponentCurrent = row.entity;
                    $scope.relateComponentCurrentStatus = $scope.relateComponentCurrent.status;
                }
                else {
                    $scope.relateComponentCurrent = {};
                    $scope.relateComponentCurrentStatus = null;
                }

            });
            gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                $scope.gridApi.selection.clearSelectedRows();
                $scope.relateComponentCurrent = {};
            });
        }
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.search = function (planId) {
    	$scope.relateComponentCurrent.id = null;
        return MaintainPlanService.queryRelateComponents(planId).then(
            function (res) {
                $scope.planId = planId;
                $scope.gridComponent.data = res;
            },
            function (err) {
                alert(err.data.message);
            }
        );
    };
    var checkCurrentSelected = function() {
        if(!$scope.relateComponentCurrent.id) {
            alert('请选择一行数据');
            return false;
        }
        return true;
    };

    $scope.open= function () {
        var modalTitle = '添加配件';
            $scope.gridApi.selection.clearSelectedRows();
        var myModal = $modal.open({
            backdrop: false,
            windowClass: '',
            templateUrl: 'openComponent.html',
            controller: 'addComponentCtrl',
            resolve: {
                modalTitle: function () {
                    return modalTitle;
                },
                parentId:function(){
                    return parentId;
                }
            }
        });
        myModal.result.then(function (relateComponentCurrent) {
            relateComponentCurrent.maintainPlanId = $scope.planId;
                MaintainPlanService.saveRelateComponent(relateComponentCurrent).then(
                    function (res) {
                        $scope.search($scope.planId);
                    },
                    function (err) {
                        alert(err.data.message);
                    }
                );
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.remove = function(){
        if(!checkCurrentSelected()) {return false;}
        if(!confirm('确定删除？')) {return false;}
        MaintainPlanService.removeRelateComponent($scope.relateComponentCurrent.id).then(
            function (res) {
                $scope.search($scope.planId);
                alert('已删除');
            },
            function (err) {
            }
        );
    }
    $scope.search(planId);
});
app.controller('addComponentCtrl', function ($scope, $http, $interval, $q, $modal, $log, $timeout, $modalInstance,uiGridConstants,modalTitle,parentId,MaintainPlanService) {
    $scope.components = [];
    $scope.relateComponent = {};
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
    $scope.initComponent = function(parentId){
        return MaintainPlanService.initComponent2(parentId).then(
            function (res) {
                $scope.components = res;
            },
            function (err) {
                alert(err.data.message);
            }
        );
    };
    $scope.save = function(){
            $scope.relateComponent.componentCode =  $scope.component.componentCode;
            $scope.relateComponent.componentName =  $scope.component.componentName;
        $scope.relateComponent.componentId =  $scope.component.id;
        $modalInstance.close($scope.relateComponent);
    };

    $scope.initComponent(parentId);
});
