(function() {
    'use strict';

    angular
        .module('angularGrid')
        .directive('angularGridElement', angularGridElement);

    function angularGridElement() {
        var directive = {
            controller: angularGridElementController,
            controllerAs: 'gridElementCtrl'
        };
        return directive;

		angularGridElementController.$inject = ["$scope", "$element"];

		function angularGridElementController($scope, $element) {
			var gridElementCtrl = this;
			var gridCtrl = $element.parent().controller("angularGrid");
			var type = $element[0].getAttribute("angular-grid-element");
				
			gridElementCtrl.$onInit = function(){
				setTimeout(function(){
					$element.bind("click",function(e,x){
						$scope.$evalAsync(function(){
							gridElementCtrl.onElementCkick(e, type);	
						})
					});
				});		
				
				switch(type)
				{
					case "row":
							$element.addClass("angularGridRow");
					break;

					case "cell":
						if(typeof($scope.col.customDisplayTextFunc()) === "function")
						{
							var customValue = $scope.col.customDisplayTextFunc()(
							{
								cell: $scope.row[$scope.col.fieldName],
								row: $scope.row,
								col: $scope.col,
								queryParams: gridCtrl.queryParams, 
								element: $element
							});
							$scope.cellValue = customValue;
						}
						else{
							$scope.cellValue = $scope.row[$scope.col.fieldName];
						}
					break;
				}
			};
			
			gridElementCtrl.onElementCkick = function(e, type){
				if(!type)
				{
					throw "on angularGridElement, type is not specified."+
					" The type such as 'cell, headerCell, globalSelectToggler, row, rowSelector, gridBody' e.g angular-grid-element='rowSelector'";
				}
								
				gridCtrl.onElementAction(
				{ 
					action:"click", 
					elementType:type, 
					eventArgs : e, 
					element: $element,
					row : $scope.row,
					col : $scope.col						
				});
			}
		}
	}
})();