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
			//template:"<p>Test para {{testText}}</p>",
            //restrict: 'E',
            scope: {
				selectionMode : "@",
				onSelectedItemsChanged : "&",
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
			var gridCtrlScope = $element.parent().scope("angularGrid");
			var selectorInstance = gridCtrl.angularGrid.selector = {};
			
			gridCtrl.selectedItemIds = {};
			
			selectorInstance.getSelectedItemIds = function(){
				return Object.keys(gridCtrl.selectedItemIds);
			};
			
			selectorInstance.setSelectedItemIds = function(items, appendItems){
				items.forEach(function(eachId) {
					gridCtrl.selectedItemIds[eachId] = true;
				});
			};
			
			$scope.$on("onElementAction", function(e, args){
				if(args.elementType === "rowSelector"){
					gridItmSltrCtrl.onRowSelectorClicked(args);
				}
			});
									
			gridItmSltrCtrl.onRowSelectorClicked = function(args){
				switch($scope.selectionMode.toLowerCase()){
					case "single":
							gridCtrl.selectedItemIds = {};
							var id = args.row[gridCtrl.identityFieldName];
							gridCtrl.selectedItemIds[id] = true;
						break;
						
					case "multiple":
							var id = args.row[gridCtrl.identityFieldName];
							if(gridCtrl.selectedItemIds[id]){	
								delete gridCtrl.selectedItemIds[id]
							}
							else{
								gridCtrl.selectedItemIds[id] = true;
							}
						break;
				}
				
			};
		
		}
	}
})();