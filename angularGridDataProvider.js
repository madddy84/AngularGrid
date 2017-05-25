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
    GridDataProviderController.$inject = ["$scope", "$element","$window","$q"];

    function GridDataProviderController($scope, $element, $window,$q) {
        var gridDpCtrl = this;
        var gridCtrl = $element.parent().controller("angularGrid");
		gridCtrl.queryParams.skip = 0
		gridCtrl.queryParams.take = gridDpCtrl.pageSize || 50;
		
		gridDpCtrl.isDataFetchProgress = true;
		
		gridCtrl.dataSource = function(queryParamaters) {
					
			var defered = $q.defer();
			  switch (gridDpCtrl.type.toUpperCase()) {
                case "PROMISE":
                    gridDpCtrl.source()(queryParamaters).then(function(data){
						defered.resolve(data)
					});
                    break;
					
				case "JSON":
						setTimeout(function(){
							defered.resolve(gridDpCtrl.source());
						})
                    break;
            }
			return defered.promise;
		}
		
		setTimeout(function(){
			angular.element($window).bind("scroll", function(e) {
				var st = document.body.scrollTop;
			});
		})
		
		gridDpCtrl.fetchNextPage = function(){
			if(gridDpCtrl.isDataFetchProgress){
				return;
			}
			gridCtrl.queryParams.skip += gridCtrl.queryParams.take;
			gridDpCtrl.fetchData();
		}
		
		gridDpCtrl.pageEndReached = false;
		
		gridDpCtrl.fetchData = function(callback) {
			gridDpCtrl.isDataFetchProgress = true;
			gridCtrl.dataSource(gridCtrl.queryParams).then(function(result) {
				gridCtrl.dataItems = gridCtrl.dataItems.concat(result);
				gridCtrl.populateVisibleItems();
				if(typeof(callback) === "function")
				{
					callback(result);
				}
				gridDpCtrl.isDataFetchProgress = false;
			});
        }
		
		gridDpCtrl.fetchCount = function(callback){
			gridDpCtrl.countSource()(gridCtrl.queryParams)
			.then(function(result) {
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
    }
})();