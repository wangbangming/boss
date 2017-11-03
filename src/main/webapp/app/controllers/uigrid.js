app.controller('UiGridCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.gridOptions1 = {
        paginationPageSizes: [25, 50, 75],
        paginationPageSize: 25,
        columnDefs: [
            {name: 'name'},
            {name: 'gender'},
            {name: 'company'}
        ]
    };

    $scope.gridOptions2 = {
        enablePaginationControls: false,
        paginationPageSize: 25,
        columnDefs: [
            {name: 'name'},
            {name: 'gender'},
            {name: 'company'}
        ]
    };

    $scope.gridOptions2.onRegisterApi = function (gridApi) {
        $scope.gridApi2 = gridApi;
    };

    $http.get('data/100.json')
        .success(function (data) {
            $scope.gridOptions1.data = data;
            $scope.gridOptions2.data = data;
        });

}]);
