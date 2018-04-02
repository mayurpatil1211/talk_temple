angular.module('appRoutes',['ngRoute'])
.config(function($routeProvider, $locationProvider){
	$routeProvider
	.when('/',{
		templateUrl:'app/views/pages/users/home.html',
		controller: 'facebookCtrl',
		controllerAs:'facebook'
	})
	.when('/facebookerror',{
		templateUrl:'app/views/pages/users/login.html',
		controller: 'facebookCtrl',
		controllerAs:'facebook'
	})
	.when('/googleerror',{
		templateUrl:'app/views/pages/users/login.html',
		controller: 'googleCtrl',
		controllerAs:'google'
	})

	.otherwise({redirectTo:'/facebookerror'});

	$locationProvider.html5Mode({
		enabled : true,
		requireBase : false
	});
});
