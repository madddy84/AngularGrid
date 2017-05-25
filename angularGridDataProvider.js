(function() {
    'use strict';

    angular
        .module('angularGrid')
        .directive('angularGridDataProvider', angularGridDataProvider);

    function angularGridDataProvider() {
        var directive = {
            bindToController: {
                type: "@",
                source: "&",
				countSource: "&",
				pageSize: "@"
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
    GridDataProviderController.$inject = ["$scope", "$element","$window"];

    function GridDataProviderController($scope, $element, $window) {
        var gridDpCtrl = this;
        var gridCtrl = $element.parent().controller("angularGrid");
		gridCtrl.totalItemCount = 0;
        		
		gridCtrl.queryParams.skip = 0
		gridCtrl.queryParams.take = 50
		
		gridDpCtrl.isDataFetchProgress = true;
		
		setTimeout(function(){
			angular.element($window).bind("scroll", function(e) {
				var st = document.body.scrollTop;
			});
		})
		
		gridDpCtrl.fetchNextPage = function(){
			if(gridDpCtrl.isDataFetchProgress){
				return;
			}
			gridCtrl.queryParams.skip += gridDpCtrl.pageSize || 50;
			gridDpCtrl.fetchData();
		}
		
		gridDpCtrl.pageEndReached = false;
		
		gridDpCtrl.fetchData = function(callback) {
			gridDpCtrl.isDataFetchProgress = true;
            switch (gridDpCtrl.type.toUpperCase()) {
                case "PROMISE":
                    gridDpCtrl.source()(gridCtrl.queryParams).then(function(result) {
                        gridCtrl.dataItems = gridCtrl.dataItems.concat(result);
						gridCtrl.populateVisibleItems();
						if(typeof(callback) === "function")
						{
							callback(result);
						}
						gridDpCtrl.isDataFetchProgress = false;
					});
                    break;
					
				case "JSON":
                        gridCtrl.dataItems = gridDpCtrl.source();
						gridCtrl.populateVisibleItems();
						gridDpCtrl.isDataFetchProgress = false;
                    break;
            }
        }
		
		gridDpCtrl.fetchCount = function(callback){
			gridDpCtrl.countSource()(gridCtrl.queryParams).then(function(result) {
                        gridCtrl.totalItemCount = result;
						if(typeof(callback) === "function")
						{
							callback(result);
						}
					});
		}

        $scope.$on("onReload",function(){
			gridDpCtrl.fetchData();
		});
  
		$scope.$on("onInfiniteScroll",function(){
			gridDpCtrl.fetchNextPage();
		});
		
        setTimeout(function() {
            $element.parent().children();
        }, 0);
    }
})();