(function() {
    'use strict';

    angular
        .module('angularGrid')
        .directive('angularGrid', angularGrid);

    angularGrid.$inject = ["$compile","$window"];

    function angularGrid($compile,$window) {
        var directive = {
            scope: true,
            controller: AngularGridController,
            controllerAs: 'gridCtrl',
            link: link,
            template:"<ng-transclude include-replace></ng-transclude>" +
					 "<div ng-include='gridTemplateUrl' include-replace></div>",
            bindToController: {
                angularGrid: "=?",
				rowTemplateUrl: "@",
				gridTemplateUrl :"@"
            },
			
            transclude: true,
        };
        return directive;

        function link(scope, element, attrs, gridCtrl) {
			scope.gridTemplateUrl = scope.gridTemplateUrl || "../defaultTemplates/gridTemplate.html"
			scope.angularGrid = scope.angularGrid || {};
        }
    }

	AngularGridController.$inject = ["$scope", "$element","$compile"];
    function AngularGridController($scope) {
        var gridCtrl = this;

		gridCtrl.$onInit = function(){
			gridCtrl.onElementAction = function(e){
				$scope.$broadcast("onElementAction",e);
			};
			
			gridCtrl.onInfiniteScroll = function(){
				$scope.$broadcast("onInfiniteScroll");
			}
			
			gridCtrl.visibleItems = [];
			gridCtrl.dataItems = [];
			gridCtrl.clientSideFilters = [];
			gridCtrl.queryParams = {};
			
			gridCtrl.populateVisibleItems = function() {
				gridCtrl.visibleItems = gridCtrl.dataItems;
				gridCtrl.clientSideFilters.forEach(function(eachFilter) {
					if (typeof(eachFilter) === "function") {
						gridCtrl.visibleItems = eachFilter(gridCtrl.visibleItems);
					}
				});
			};
		};
    };
})();