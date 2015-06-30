(function() {
    var app = angular.module('admin-directives', []);

    app.directive("opciones", function() {
      	return {
        	restrict: 'A',
        	templateUrl: "html/tabsAdmin.html",
	        controller: function() {
	          this.tab = 4;

	          this.isSet = function(checkTab) {
	            return this.tab === checkTab;
	          };

	          this.setTab = function(activeTab) {
	            this.tab = activeTab;
	          };
	        },
	        controllerAs: "tab"
      	};
    });

    app.directive("reporte", function() {

    	return {
    		restrict: 'A',
    		templateUrl: "html/generaReporte.html",
    		controller : "reporteController"
    	};

    });


    app.directive("tabla", function() {

        return {
            restrict: 'A',
            templateUrl: "html/tabla.html",
            controller : "reporteController"
        };

    });

})();