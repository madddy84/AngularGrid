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
		}

		angularGridItemSelectorController.$inject = ["$scope", "$element"];

		function angularGridItemSelectorController($scope, $element) {
			var gridItmSltrCtrl = this;
			var gridCtrl = $element.parent().controller("angularGrid");
			var gridCtrlScope = $element.parent().scope("angularGrid");
			var selectorInstance = gridCtrl.angularGrid.selector = {};
			
			gridCtrl.allDataItems = {};
			
			gridCtrl.affectedItemIds = {};
			gridCtrl.globalSelectionFlag = false;
			
			selectorInstance.getSelectedItemIds = function(){
				if(gridCtrl.globalSelectionFlag)
				{
					//If gridCtrl.globalSelectionFlag is true that means the 
					//items in gridCtrl.affectedItemIds are de-selected ids
					var selectedIds = [];
					var aids = Object.keys(gridCtrl.allDataItems);
					for(var i=0;i<aids.length;i++)
					{
						if(!gridCtrl.affectedItemIds[aids[i]])
						{
							selectedIds.push(aids[i]);
						}
					}
					return selectedIds;
				}
				return Object.keys(gridCtrl.affectedItemIds);
			};
			
			selectorInstance.setSelectedItemIds = function(items, appendItems){
				items.forEach(function(eachId) {
					gridCtrl.affectedItemIds[eachId] = true;
				});
			};
						
			gridCtrl.dataSource({skip:0, take:9999999}).then(function(data){
				for(var i=0;i<data.length;i++)
				{
					gridCtrl.allDataItems[data[i][gridCtrl.identityFieldName]] = data[i];
				}
			});
			
			$scope.$on("onElementAction", function(e, args){
				
				switch(args.elementType)
				{
					case "rowSelector":
						gridItmSltrCtrl.onRowSelectorClicked(args);
						break
					
					
					case "globalSelectToggler":
							
						var itemsAffectedCount = Object.keys(gridCtrl.affectedItemIds).length;
					
						// If nothing is selected/deselected manually
						if(itemsAffectedCount == 0){
							// Then select/unselect everything globally
							gridCtrl.globalSelectionFlag = !gridCtrl.globalSelectionFlag;
							return;
						}
						
						//If everything is selected by clicking each item individually
						if(itemsAffectedCount === Object.keys(gridCtrl.allDataItems).length){
							gridCtrl.affectedItemIds = {};
							return;
						}
						
						//If few items are affected manually
						if(itemsAffectedCount)
						{
							gridCtrl.affectedItemIds = {};
							gridCtrl.globalSelectionFlag = true;
						}
					break;
				}
			});
									
			gridItmSltrCtrl.onRowSelectorClicked = function(args){
				switch($scope.selectionMode.toLowerCase()){
					case "single":
							gridCtrl.affectedItemIds = {};
							var id = args.row[gridCtrl.identityFieldName];
							gridCtrl.affectedItemIds[id] = true;
						break;
						
					case "multiple":
							var id = args.row[gridCtrl.identityFieldName];
							if(gridCtrl.affectedItemIds[id]){	
								delete gridCtrl.affectedItemIds[id]
							}
							else{
								gridCtrl.affectedItemIds[id] = true;
							}
						break;
				}
				
			};
		
		}
	}
})();