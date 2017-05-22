(function() {
    'use strict';

    angular
        .module('angularGrid')
        .directive('angularGridColumnDefinition', angularGridColumnDefinition);

    function angularGridColumnDefinition() {
        var directive = {
            bindToController: {
                sortOrder: "@",
                fieldName: "@",
				fieldTitle: "@",
				rowCellTemplateUrl: "@",
				headerCellTemplateUrl: "@",
				cellSize:"="
            },
            require: "^angularGridColumns",
            controller: angularGridColumnDefinitionController,
            controllerAs: 'gridClmnsDefCtrl',
            link: link,
            //restrict: 'E',
            scope: true
        };
        return directive;

        function link($scope, element, attrs) {}
    }
    angularGridColumnDefinitionController.$inject = ["$scope", "$element"];

    function angularGridColumnDefinitionController($scope, $element) {
        var gridClmnsDefCtrl = this;
        var gridClmnsCtrl = $element.parent().controller("angularGridColumns");
		var gridCtrl = $element.parent().controller("angularGrid");
		
        setTimeout(function() {
			
			var cssClasses = [];
			
			if($scope.cellSize)
			{
				$scope.cellSize.xs ? cssClasses.push("col-xs-" + $scope.cellSize.xs) : "";
				$scope.cellSize.sm ? cssClasses.push("col-sm-" + $scope.cellSize.sm) : "";
				$scope.cellSize.md ? cssClasses.push("col-md-" + $scope.cellSize.md) : "";
				$scope.cellSize.lg ? cssClasses.push("col-lg-" + $scope.cellSize.lg) : "";
			}
			
			gridClmnsDefCtrl
				gridCtrl.columns.push(
				{
					sortOrder : gridClmnsDefCtrl.sortOrder,
					fieldName : gridClmnsDefCtrl.fieldName,
					fieldTitle : gridClmnsDefCtrl.fieldTitle,
					headerCellTemplateUrl : gridClmnsDefCtrl.headerCellTemplateUrl || "../defaultTemplates/columnHeaderCellTemplate.html",
					rowCellTemplateUrl : gridClmnsDefCtrl.rowCellTemplateUrl || "../defaultTemplates/rowCellTemplate.html",
					cssClasses : cssClasses.length ? cssClasses.join(" ") : "col-xs-1"
				});
        }, 0);
    }
})();