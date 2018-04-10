angular.module('userController',[])
.controller('facebookCtrl', function($routeParams, $location, $window){
	var app=this;
	app.errorMsg = 'Facebook Account not found'

}) 

.controller('googleCtrl', function($routeParams, $location, $window){
	var app=this;
	app.errorMsg = 'Google Account not found'

}) 


.controller('linkedInCtrl', function($routeParams, $location, $window){
	var app=this;
	app.errorMsg = 'LinkedIn Account not found'

}) 