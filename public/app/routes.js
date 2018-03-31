angular.module('appRoutes',['ngRoute'])
.config(function($routeProvider, $locationProvider){
	$routeProvider
	.when('/facebookerror',{
		templateUrl:'app/views/pages/users/login.html',
		controller: 'facebookCtrl',
		controllerAs:'facebook',
		authenticated:false
	})

	.otherwise({redirectTo:'/facebookerror'});

	$locationProvider.html5Mode({
		enabled : true,
		requireBase : false
	});
});
