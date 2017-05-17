
///---------------------------------------- Header Cell Repeater ---------------------------------------------///

(function() {
    'use strict';

    angular
        .module('angularGrid')
        .directive('headerRepeater', headerRepeater);

    function headerRepeater() {
        var directive = {
            // bindToController: {
              
            // },
            require: "^angularGrid",
            controller: angularGridHeaderCellRepeaterController,
            controllerAs: 'hdrRptrController',
            link: link,
            //restrict: 'E',
            scope: true,
			replace:true,
			template:'<div ng-repeat="col in gridCtrl.columns" ng-include="col.headerCellTemplateUrl" include-replace></div>'
        };
        return directive;

        function link(scope, element, attrs) {}
    }
    angularGridHeaderCellRepeaterController.inject = ["$scope", "$element"];

    function angularGridHeaderCellRepeaterController($scope, $element) {
        var hdrRptrController = this;
        var gridCtrl = $element.parent().controller("angularGrid");
    }
})();

///---------------------------------------- Row Repeater ---------------------------------------------///

(function() {
    'use strict';

    angular
        .module('angularGrid')
        .directive('rowRepeater', rowRepeater);

    function rowRepeater() {
        var directive = {
            // bindToController: {
             
            // },
            require: "^angularGrid",
            controller: angularGridRowRepeaterController,
            controllerAs: 'rowRptrController',
            link: link,
            //restrict: 'E',
            scope: true,
			replace:true,
			template:'<div ng-repeat="visibleItem in gridCtrl.visibleItems" ng-include="gridCtrl.rowTemplateUrl" include-replace></div>'
        };
        return directive;

        function link(scope, element, attrs) {}
    }
    angularGridRowRepeaterController.inject = ["$scope", "$element"];

    function angularGridRowRepeaterController($scope, $element) {
        var rowRptrController = this;
        var gridCtrl = $element.parent().controller("angularGrid");
		gridCtrl.rowTemplateUrl = gridCtrl.rowTemplateUrl || "../defaultTemplates/rowTemplateUrl.html"
		
    }
})();

(function() {
    'use strict';

    angular
        .module('angularGrid')
        .directive('rowCellRepeater', rowCellRepeater);

    function rowCellRepeater() {
        var directive = {
            // bindToController: {
             
            // },
            require: "^angularGrid",
            controller: angularGridRowCellRepeaterController,
            controllerAs: 'rowCellRptrController',
            link: link,
            //restrict: 'E',
            scope: true,
			replace:true,
			template:'<div ng-repeat="col in gridCtrl.columns" ng-include="col.rowCellTemplateUrl" include-replace></div>'
        };
        return directive;

        function link(scope, element, attrs) {}
    }
    angularGridRowCellRepeaterController.inject = ["$scope", "$element"];

    function angularGridRowCellRepeaterController($scope, $element) {
        var rowCellRptrController = this;
        var gridCtrl = $element.parent().controller("angularGrid");
    }
})();