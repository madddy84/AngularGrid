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

		angularGridElementController.inject = ["$scope", "$element"];

		function angularGridElementController($scope, $element) {
			var gridElementCtrl = this;
			var gridCtrl = $element.parent().controller("angularGrid");
			
			setTimeout(function(){
				$element.bind("click",function(e,x){
					var type = $element[0].getAttribute("angular-grid-element");
					gridElementCtrl.onElementCkick(e, type);
				});
			});
			
			gridElementCtrl.onElementCkick = function(e, type){
				if(!type)
				{
					throw "on angularGridElement, type is not specified. The type such as 'cell, headerCell, row, rowSelector' e.g angular-grid-element";
				}
				
				switch(type.toLowerCase()){
					
					case "cell":
							var angularGridItemSelector = gridElementCtrl.getParentElement($element,"angularGrid")[0].querySelector(".angularGridItemSelector");
							var gridItmSltrCtrl = angularGridItemSelector.controller();
							gridItmSltrCtrl.onCellClicked();
							
						break;
					
				}
			}
			
			gridElementCtrl.getParentElement = function (e, className) {
			  if (e[0].nodeName == "HTML") {
				return null;
			  } else if (e.hasClass(className)) {
				return e;
			  } else {
				return gridElementCtrl.getParentElement(e.parent(), className);
			  }
			}
		}
	}
})();