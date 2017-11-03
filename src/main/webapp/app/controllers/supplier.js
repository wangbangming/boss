app.controller('ModalDemoCtrl', function (
    $scope, $http, $interval, $q, $modal, $log, $timeout, uiGridConstants, SupplierService) {

    $scope.supplierCurrent = {};
    $scope.supplierCurrentStatus = null;

    $scope.gridOptions = {
        columnDefs: [
            {name: 'supplierName', displayName: "供应商名称"},
            {name: 'supplierEmail', displayName: "供应商邮箱"},
            {name: 'contactName', displayName: "联系人"},
            {name: 'contactPhone', displayName: "联系人电话"},
            {name: 'statusDisplay', displayName: "状态"}
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
                var FT = 'rowSelectionChanged - '; $log.info(FT);
                $log.log(FT, 'row:', row);
                if(row.isSelected) {
                    $scope.supplierCurrent = row.entity;
                    $scope.supplierCurrentStatus = $scope.supplierCurrent.status;
                }
                else {
                    $scope.supplierCurrent = {};
                    $scope.supplierCurrentStatus = null;
                }
                $log.log('$scope.supplierCurrent:', $scope.supplierCurrent);
                $log.log('$scope.supplierCurrentStatus:', $scope.supplierCurrentStatus);
            });
            gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                var FT = 'paginationChanged - '; $log.info(FT);
                $log.log(FT, 'newPage:', newPage);
                $scope.gridApi.selection.clearSelectedRows();
                $scope.supplierCurrent = {};
            });
        }
    };

    /*$http.get('rest/suppliers').success(function (data) {
        $scope.gridOptions.data = data;
    });*/

    $scope.open = function (windowClass, templateUrl, mode) {
        var modalTitle = '', modalAction = '';
        if(mode == 'edit') {
            if(!$scope.supplierCurrent.id) {
                alert('no supplierCurrent selected');
                return;
            }
            modalTitle = '编辑供应商'; modalAction = '保存';
        }
        else if(mode == 'delete') {
            if(!$scope.supplierCurrent.id) {
                alert('no supplierCurrent selected');
                return;
            }
            modalTitle = '删除供应商'; modalAction = '删除';
        }
        else if(mode == 'add') {
            $scope.gridApi.selection.clearSelectedRows();
            $scope.supplierCurrent = {};
            modalTitle = '注册供应商'; modalAction = '保存';
        }
        else {
            alert('wrong mode');
            return;
        }

        var myModal = $modal.open({
            backdrop: false,
            windowClass: windowClass,
            templateUrl: templateUrl,
            controller: 'ModalInstanceCtrl',
            resolve: {
                supplierNow: function () {
                    return $scope.supplierCurrent;
                },
                modalTitle: function () {
                    return modalTitle;
                },
                modalAction: function () {
                    return modalAction;
                }
            }
        });

        myModal.result.then(function (supplierCurrent) {
            $log.info('supplierCurrent: ', supplierCurrent);
            if(mode == 'edit') {
                $log.info('edit...');
                SupplierService.save(supplierCurrent).then(
                    function (res) {
                    },
                    function (err) {
                    }
                );
                angular.copy(supplierCurrent, $scope.supplierCurrent);
            }
            if(mode == 'delete') {
                $log.info('delete...');
                SupplierService.remove(supplierCurrent.id).then(
                    function (res) {
                        $scope.queryAll();
                    },
                    function (err) {
                    }
                );
            }
            if(mode == 'add') {
                $log.info('add...');
                SupplierService.save(supplierCurrent).then(
                    function (res) {
                        $scope.queryAll();
                    },
                    function (err) {
                    	alert(err.data.message);
                    }
                );
            }
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.refreshPage = function (pageNumber) {
        var FT = 'refreshPage - ';
        $log.info(FT);
    };

    $scope.queryAll = function () {
        var FT = 'queryAll - ';
        $log.info(FT);
        return SupplierService.query().then(
            function (res) {
                c.log(FT, 'res:', res);
                $scope.gridOptions.data = res;
            },
            function (err) {
                c.log(FT, 'err:', err);
                alert(err.data.message);
            }
        );
    };

    $scope.checkOne = function () {
        var FT = 'checkOne - ';
        $log.info(FT);
        var id = 1004;
        return SupplierService.one(id).then(
            function (res) {
                c.log(FT, 'res:', res);
            },
            function (err) {
                c.log(FT, 'err:', err);
            }
        );
    };

    $scope.checkQuery = function () {
        var FT = 'checkQuery - ';
        $log.info(FT);
        return SupplierService.query().then(
            function (res) {
                c.log(FT, 'res:', res);
            },
            function (err) {
                c.log(FT, 'err:', err);
            }
        );
    };

    $scope.checkSave = function () {
        var FT = 'checkSave - ';
        $log.info(FT);
        var supplier = {
            "id": 1003,
            "supplierName": "供应商09",
            "supplierEmail": "s09@163.com",
            "contactName": "联系人09",
            "contactPhone": "15618601009"
        };
        return SupplierService.save(supplier).then(
            function (res) {
                c.log(FT, 'res:', res);
            },
            function (err) {
                c.log(FT, 'err:', err);
            }
        );
    };

    $scope.checkRemove = function () {
        var FT = 'checkRemove - ';
        $log.info(FT);
        var id = 1005;
        return SupplierService.remove(id).then(
            function (res) {
                c.log(FT, 'res:', res);
            },
            function (err) {
                c.log(FT, 'err:', err);
            }
        );
    };

    var checkCurrentSelected = function() {
        if(!$scope.supplierCurrent.id) {
            alert('请选择一行数据');
            return false;
        }
        $log.log('$scope.supplierCurrent:', $scope.supplierCurrent);
        return true;
    };

    $scope.active = function () {
        var FT = 'active - '; $log.info(FT);
        if(!checkCurrentSelected()) {return false;}
        $scope.supplierCurrent.status = 1;
        $scope.supplierCurrent.statusDisplay = '正常';
        SupplierService.save($scope.supplierCurrent).then(
            function (res) {
                alert('已激活');
            },
            function (err) {
            }
        );
    };

    $scope.lock = function () {
        var FT = 'lock - '; $log.info(FT);
        if(!checkCurrentSelected()) {return false;}
        $scope.supplierCurrent.status = 2;
        $scope.supplierCurrent.statusDisplay = '锁定';
        SupplierService.save($scope.supplierCurrent).then(
            function (res) {
                alert('已锁定');
            },
            function (err) {
            }
        );
    };

    $scope.unlock = function () {
        var FT = 'unlock - '; $log.info(FT);
        if(!checkCurrentSelected()) {return false;}
        $scope.supplierCurrent.status = 1;
        $scope.supplierCurrent.statusDisplay = '正常';
        SupplierService.save($scope.supplierCurrent).then(
            function (res) {
                alert('已解锁');
            },
            function (err) {
            }
        );
    };

    $scope.removeLine = function () {
        var FT = 'removeLine - '; $log.info(FT);
        if(!checkCurrentSelected()) {return false;}
        if(!confirm('确定删除？')) {return false;}
        SupplierService.remove($scope.supplierCurrent.id).then(
            function (res) {
                $scope.queryAll();
                alert('已删除');
            },
            function (err) {
            }
        );
    };

    $scope.queryAll();

});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.
app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, supplierNow, modalTitle, modalAction) {
    $scope.modalTitle = modalTitle;
    $scope.modalAction = modalAction;
    $scope.supplier = {};
    angular.copy(supplierNow, $scope.supplier);
    $scope.ok = function () {
        $modalInstance.close($scope.supplier);
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});
