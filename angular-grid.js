var myApp = angular.module("angularGrid",[]);

myApp.directive("angularGrid",[function(){
	return {
		templateUrl: "../defaultTemplates/gridTemplate.html",
		scope:{
			name : "=",
			identityField : "=",
		},
		transclude:{
			headerTransclude: "headerTransclude",
			columnsTransclude: "columnsTransclude"
		}
	}
	
}]);

myApp.directive("angularGridColumn",[function(){
	return {
		templateUrl: "../defaultTemplates/gridColumnTemplate.html",
	
		//Attributes 
		//		headerText
		//		fieldName
		

		
	}
	
}]);