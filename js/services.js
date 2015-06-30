var app = angular.module('services', [])

app.factory("SessionService", function(){
  return{
    get: function(key){
      return localStorage.getItem(key);
    },
    set: function(key, value){
      return localStorage.setItem(key, value);
    },
    unset: function(key){
      return localStorage.removeItem(key);
    },
  }
})


app.factory('Session', function($http, $rootScope, $location, $firebaseAuth, SessionService) {

  // var guardarCache= function(datos){
  //   SessionService.set('logueado', true);
  //   SessionService.set('datosSesion', datos);

  // };
  // var limpiarCache= function(){
  //   SessionService.unset('datosSesion');
  //   SessionService.unset('logueado')
  //   localStorage.clear();
  // };

  return {
    // guardarSesion: function(datos){
    //   datos = JSON.stringify(datos)
    //   guardarCache(datos)
    //   $rootScope.datosUsuario = JSON.parse(SessionService.get('datosSesion'));
    // },
    // quitarSesion: function(){
    //   limpiarCache()
    //   $rootScope.login = SessionService.get('logueado')
    //   $location.path('/')
    // },

    // getDatosSesion: function(){
    //   return JSON.parse(SessionService.get('datosSesion'));
    // },
    // getSesion: function(){
    //   return SessionService.get('logueado');
    // },
    getConexion: function(entrada) {

        var ref = new Firebase("https://novm.firebaseio.com/"+entrada);

        // try{
        //     // Obtiene la informacion del JSON para iniciar sesion en FIrebase
        //     $http.get('js/null.json').success(function(data){

        //         // Convierte el valor "data" a una cadena JSON
        //         var datos = JSON.stringify(data)
        //         var json = JSON.parse( datos );

        //         ref.authWithCustomToken(json.nn, function(error) {

        //             if (error){} else { return ref; }

        //         }, function (errorObject){
        //               console.error(errorObject)
        //         });


        //     }).error(function (error){
        //       console.log(error)
        //     });

        // }catch (err){
        //   console.error(err)
        // }
            
        return ref;
    }
  }

});
