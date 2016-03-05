var myApp = angular.module('myApp' , ['ngRoute', 'firebase'])
	.constant('FIREBASE_URL' , 'https://angdata05.firebaseio.com/');

myApp.run(['$rootScope', '$location', function($rootScope, $location) {
	$rootScope.$on('$routeChangeError' , function(event, next, previous, error){
		if(error == 'AUTH_REQUIRED') {
			$rootScope.message = 'Sorry, must be logged in to access that page';
			$location.path('/login');
		}
	});
}]);

myApp.config(['$routeProvider' , function($routeProvider) {
	$routeProvider
		.when('/login', {
			templateUrl: 'views/login.html',
			controller: 'RegistrationController'
		})
		.when('/register', {
			templateUrl: 'views/register.html',
			controller: 'RegistrationController'
		})
		.when('/checkins/:uId/:mId', {
			templateUrl: 'views/checkins.html',
			controller: 'CheckInsController'
		})
		.when('/meetings', {
			templateUrl: 'views/meetings.html',
			controller: 'MeetingsController',
			resolve: {
				currentAuth: function(Authentication) {
					return Authentication.requireAuth();
				}
			}
		})
		.otherwise({
			redirectTo: '/login'
		})
}]);

myApp.controller('RegistrationController' , ['$scope', function($scope) {
	$scope.message="Welcome to my App";
}]);