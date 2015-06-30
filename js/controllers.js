var app = angular.module('controllers', []);


// Controlador que valida las credenciales al momento de iniciar sesion
app.controller('adminController', function($scope, Session, $timeout, $location) {

	console.log("COntrolador Admin")

	// Muestra el campo usuario y contraseña
	$("#bloqueSesion").show()
	//Crea una instancia de Firebase
	 var conn = Session.getConexion("encuestaOficina");

	// Valida las credenciales del Usuario con las que se encuentran en Firebase.
	this.SignIn = function() {

		conn.authWithPassword({
			email    : $scope.email,
			password : $scope.password
		}, function(error, authData) {
			if (error) {
				console.log("Incorrecto!!")
			}else{
				console.log("Bienvenido")
				$("#bloqueSesion").hide();
				$("#bloqueListar").show();
			}

		});
	}

});//Cierre Controlador

// Contiene todas las opciones disponibles para el calendario
app.controller('reporteController', function($scope, Session, $timeout, $firebaseArray) {

	// Declaracion de Variables
	var linkOficina= new Firebase("https://novm.firebaseio.com/encuestaOficina");
	var linkCall= new Firebase("https://novm.firebaseio.com/encuestaCall");
	var date = new Date();
	var nombreArchivoOficina = date.toLocaleString()+"tablaDatosOficina";
	var nombreArchivoCall = date.toLocaleString()+"tablaDatosCall";
	var conn = Session.getConexion("encuestaOficina")
	var fechaActual = new Date()

	$scope.exportarDatosOficina = function () {
		var blob = new Blob([document.getElementById('tablaDatosOficina').innerHTML], {
			type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
		});
		saveAs(blob, nombreArchivoOficina+".xls");
	};

	$scope.exportarDatosCall = function () {
		var blob = new Blob([document.getElementById('tablaDatosCall').innerHTML], {
			type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
		});
		saveAs(blob, nombreArchivoCall+".xls");
	};

	// Funciones necesarios del calendario
	$scope.today = function() {
		$scope.fechaInicio = new Date();
		$scope.fechaFin = new Date();
	};

	$scope.today();

	$scope.clear = function () {
		$scope.fechaInicio = null;
		$scope.fechaFin = null;
	};

	// Disable weekend selection
	$scope.disabled = function(date, mode) {
		return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
	};

	$scope.toggleMin = function() {
		$scope.minDate = $scope.minDate ? null : new Date();
	};
	$scope.toggleMin();

	$scope.open = function($event) {
		$event.preventDefault();
		$event.stopPropagation();

		$scope.opened = true;

	};

	$scope.openFechaFin = function($event) {
		$event.preventDefault();
		$event.stopPropagation();

		$scope.openedFin = true;

	};
		

	$scope.dateOptions = {
		formatYear: 'yy',
		startingDay: 1
	};

	$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	$scope.format = $scope.formats[0];
	$scope.formatFin = $scope.formats[0];

	var tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);
	var afterTomorrow = new Date();
	afterTomorrow.setDate(tomorrow.getDate() + 2);
	$scope.events =
	[
	  {
		date: tomorrow,
		status: 'full'
	  },
	  {
		date: afterTomorrow,
		status: 'partially'
	  }
	];

	$scope.getDayClass = function(date, mode) {
		if (mode === 'day') {
		  var dayToCheck = new Date(date).setHours(0,0,0,0);

			for (var i=0;i<$scope.events.length;i++) {
				var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

				if (dayToCheck === currentDay) {
					return $scope.events[i].status;
				}
			}
		}
		return '';
	};
	// Finaliza funciones Calendario

	// Listener del boton "Generar Reporte"
	this.generaReporte = function() {

		// Crea una instancia de la conexion a Firebase
		var conex = new Firebase("https://novm.firebaseio.com/encuestaOficina");

		// Convierte las fechas que selecciona el usuario a formato Timestamp, sin milisegundos.
		$scope.respuestas = $firebaseArray(conex);
		$scope.datosOficina = [];
		$scope.dateInicio = new Date($scope.fechaInicio);
		$scope.dateInicio2 = $scope.dateInicio.getTime();
		$scope.dateFin = new Date($scope.fechaFin);
		$scope.fechaFin2 = $scope.dateFin.getTime();
		$scope.fInicio = ( $scope.dateInicio2 ) / 1000 | 0;
		$scope.fFIn = ( $scope.fechaFin2 ) / 1000 | 0;

		$scope.respuestas.$loaded(function() {
			$scope.datosOficina = $scope.respuestas.filter(function(respuesta) {
				$scope.muestraTabla = true;
				return parseFloat(respuesta.times) > parseFloat($scope.fInicio) && parseFloat(respuesta.times) < parseFloat($scope.fFIn);
			});
		})
	};

});//Cierre Controlador