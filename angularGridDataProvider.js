(function() {
    'use strict';

    angular
        .module('angularGrid')
        .directive('angularGridDataProvider', angularGridDataProvider);

    function angularGridDataProvider() {
        var directive = {
            bindToController: {
                type: "@",
                source: "&"
            },
            require: "^angularGrid",
            controller: GridDataProviderController,
            controllerAs: 'gridDpCtrl',
            link: link,
            restrict: 'E',
            scope: true
        };
        return directive;

        function link(scope, element, attrs) {}
    }
    GridDataProviderController.$inject = ["$scope", "$element"];

    function GridDataProviderController($scope, $element) {
        var gridDpCtrl = this;
        var gridCtrl = $element.parent().controller("angularGrid");

        gridDpCtrl.fetchData = function(callback) {
            switch (gridDpCtrl.type.toUpperCase()) {
                case "PROMISE":
                    gridDpCtrl.source()(gridCtrl.queryParams).then(function(result) {
                        gridCtrl.dataItems = result;
						gridCtrl.populateVisibleItems();
						if(typeof(callback) === "function")
						{
							callback(result);
						}
					});
                    break;
					
				case "JSON":
                        gridCtrl.dataItems = gridDpCtrl.source();
						gridCtrl.populateVisibleItems();
                    break;
            }
        }

        $scope.$on("onReload",function(){
			gridDpCtrl.fetchData();
		});

        setTimeout(function() {
            $element.parent().children();
        }, 0);
    }
})();