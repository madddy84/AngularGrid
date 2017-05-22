(function() {
    'use strict';

    angular
        .module('angularGrid')
        .directive('angularGridElement', angularGridElement);

    function angularGridElement() {
        var directive = {
            // bindToController: {
              
            // },
            controller: angularGridElementController,
            controllerAs: 'gridElementCtrl',
            link: link,
            //restrict: 'E',
            //scope: true
        };
        return directive;

        function link($scope, $element, attrs) {
			
		}

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
			};
			
			gridElementCtrl.onElementCkick = function(e, type){
				if(!type)
				{
					throw "on angularGridElement, type is not specified. The type such as 'cell, headerCell, row, rowSelector' e.g angular-grid-element";
				}
								
				gridCtrl.onElementAction(
				{ 
					action:"click", 
					elementType:type, 
					eventArgs : e, 
					element:$element,
					row : $scope.row,
					col : $scope.col						
				});
			}
		}
	}
})();