angular.module('userController',[])
.controller('facebookCtrl', function($routeParams, $location, $window){
	var app=this;
	app.errorMsg = 'Account not found'

}) 

.controller('googleCtrl', function($routeParams, $location, $window){
	var app=this;
	app.errorMsg = 'Google Account not found'

}) 