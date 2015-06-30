(function() {
  var app = angular.module('moduloAdmin', ['admin-directives', 'ngRoute', 'firebase', 'controllers', 'services', 'ui.bootstrap'] );

  	app.config(function($routeProvider){
  		$routeProvider.when("/admin", {
    		templateUrl : "html/sesionAdmin.html",
    		controller : "adminController"
  		})
  		.otherwise({ redirectTo : "/admin" });
	})


// app.run(function($rootScope, $location) {
//     $rootScope.login = Session.getSesion();
//     if ( $rootScope.login )
//     {
//         $rootScope.datosUsuario = Session.getDatosSesion();
        
//     }
//     $rootScope.$on("$routeChangeStart", function(event, next, current)
//     {
//         $rootScope.login = Session.getSesion();
//         var direccion = $location.path()

//         if ( (direccion == '/') || (direccion == '/sesion' && !$rootScope.login ) )
//         {
//             Session.quitarSesion()
//         }
//     })
// }); 
    
})();
