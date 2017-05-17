(function() {
    'use strict';

    angular
        .module('angularGrid')
        .directive('angularGrid', angularGrid);

    angularGrid.$inject = [];

    function angularGrid() {
        var directive = {
            scope: true,
            controller: AngularGridController,
            controllerAs: 'gridCtrl',
            link: link,
            template:"<ng-transclude></ng-transclude>" +
					 "<div ng-include='gridTemplateUrl'></div>",
            bindToController: {
                instanceObject: "=",
				rowTemplateUrl: "@",
				gridTemplateUrl :"@"
            },
			
            transclude: true,
        };
        return directive;

        function link(scope, element, attrs, gridCtrl) {
            gridCtrl.identityField = attrs.identityField;
			scope.gridTemplateUrl = scope.gridTemplateUrl || "../defaultTemplates/gridTemplate.html"
			
            gridCtrl.init();
			
        }
    }

    function AngularGridController() {
        var gridCtrl = this;
        gridCtrl.init = function() {
            gridCtrl.visibleItems = [];
            gridCtrl.dataItems = [];
            gridCtrl.clientSideFilters = [];
            gridCtrl.queryParams = {}

            if (!gridCtrl.instanceObject) { gridCtrl.instanceObject = {}; }

            gridCtrl.populateVisibleItems = function() {
                gridCtrl.visibleItems = gridCtrl.dataItems;
                gridCtrl.clientSideFilters.forEach(function(eachFilter) {
                    if (typeof(eachFilter) === "function") {
                        gridCtrl.visibleItems = eachFilter(gridCtrl.visibleItems);
                    }
                });
            }
        };
    };
})();