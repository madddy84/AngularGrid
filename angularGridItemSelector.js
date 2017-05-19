(function() {
    'use strict';

    angular
        .module('angularGrid')
        .directive('angularGridItemSelector', angularGridItemSelector);

    function angularGridItemSelector() {
        var directive = {
            // bindToController: {
              
            // },
            controller: angularGridItemSelectorController,
            controllerAs: 'gridItmSltrCtrl',
            link: link,
			template:"<p>Test para {{testText}}</p>",
            //restrict: 'E',
            scope: {
				selectionMode : "@",
				selectedItems : "=",
				onSelectedItemsChanged : "&"
			}
        };
        return directive;

        function link($scope, element, attrs) {
			element.addClass("angularGridItemSelector");
			$scope.testText = "Ho ho ho"
			$scope.selectedItems = [{a:1},{b:2}];
			console.log($scope);
		}

		angularGridItemSelectorController.$inject = ["$scope", "$element"];

		function angularGridItemSelectorController($scope, $element) {
			var gridItmSltrCtrl = this;
			var gridCtrl = $element.parent().controller("angularGrid");
			
			gridItmSltrCtrl.onRowClicked = function(e, row){
				
			}
			
			gridItmSltrCtrl.onCellClicked = function(e, row, coll){
				
			}
		
		}
	}
})();