(function() {
    'use strict';

    angular
        .module('angularGrid')
        .directive('angularGridColumns', angularGridColumns);

    function angularGridColumns() {
        var directive = {
            bindToController: {
                defaultSortOrder: "=",
                defaultSortFieldName: "=",
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
		}
		
		gridClmnsCtrl.populateColumns = function(){
			gridCtrl.columns = []
			$compile($element.contents())
		}
		
		gridClmnsCtrl.onToggleSort = function(col){
			
		}

        setTimeout(function() {
			gridClmnsCtrl.populateColumns();
            //gridCtrl.queryParams.sortExpression = gridClmnsCtrl.defaultSortFieldName + ' ' + gridClmnsCtrl.defaultSortOrder;
        })
    }
})();