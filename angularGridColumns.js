(function() {
    'use strict';

    angular
        .module('angularGrid')
        .directive('angularGridColumns', angularGridColumns);

	var sortOrders = {
		"DEFAULT" : "ACS",
		"ACS" : "DESC",
		"DESC" : "DEFAULT"
	}
	
    function angularGridColumns() {
        var directive = {
            bindToController: {
                identityFieldName: "@"
            },
            require: "^angularGrid",
            controller: angularGridColumnsController,
            controllerAs: 'gridClmnsCtrl',
			transclude:true,
			template:"<ng-transclude include-replace>",
            link: link,
            //restrict: 'E',
            scope: true
        };
        return directive;

        function link(scope, element, attrs) {
			console.log();
		}
    }
    angularGridColumnsController.$inject = ["$scope", "$element","$compile"];

    function angularGridColumnsController($scope, $element, $compile) {
        var gridClmnsCtrl = this;
        var gridCtrl = $element.parent().controller("angularGrid");
						
		gridClmnsCtrl.$onInit = function(){
			gridCtrl.identityFieldName = gridClmnsCtrl.identityFieldName;
			gridCtrl.columns = [];
			gridCtrl.queryParams.sortExpressions = [];
		}
		
		$scope.$on("onElementAction", function(e, args){
			if(args.elementType === "headerCell")
			{
				gridClmnsCtrl.onToggleSort(args);
			}
		});
		
		gridClmnsCtrl.onToggleSort = function(args){
			
			var column = args.col;
			
			if(!column.sortEnabled){
				return;
			}
			
			if(!args.eventArgs.shiftKey)
			{
				gridCtrl.queryParams.sortExpressions.length = 0;
			}
			else{
				var index = gridCtrl.queryParams.sortExpressions.indexOf(column.fieldName + " " + column.sortOrder);
				if(index >= 0){
					gridCtrl.queryParams.sortExpressions.splice(index,1);
				}
			}
			
			var newSortOrder = sortOrders[column.sortOrder];
			
			if(newSortOrder != "DEFAULT")
			{
				gridCtrl.queryParams.sortExpressions.push(column.fieldName + " " + newSortOrder)
			}
			
			gridCtrl.queryParams.skip = 0;
			
			gridCtrl.angularGrid.reload(function(){
				column.sortOrder = newSortOrder;
			});
		}
		
		gridClmnsCtrl.populateColumns = function(){
			gridCtrl.columns = []
			$compile($element.contents())
		}

        setTimeout(function() {
			gridClmnsCtrl.populateColumns();
        });
    }
})();