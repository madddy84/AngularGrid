(function() {
    'use strict';

    angular
        .module('angularGrid')
        .directive('angularGridHeader', angularGridHeader);

    function angularGridHeader() {
        var directive = {
            bindToController: {
                defaultSortOrder: "@",
                defaultSortFieldName: "@",
                identityFieldName: "@"
            },
            require: "^angularGrid",
            controller: angularGridHeaderController,
            controllerAs: 'gridHeaderCtrl',
			templateUrl: function(elem,attrs) {
				return attrs.templateUrl || "../defaultTemplates/columnHeaderTemplate.html"
			},
			replace:true,
            link: link,
            //restrict: 'E',
            scope: true
        };
        return directive;

        function link(scope, element, attrs) {}
    }
    angularGridHeaderController.inject = ["$scope", "$element","$compile"];

    function angularGridHeaderController($scope, $element, $compile) {
        var gridHeaderCtrl = this;
        var gridCtrl = $element.parent().controller("angularGrid");
    }
})();