'use strict';

angular.module('angular-client-side-auth', ['ngCookies'])

.config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {

	var access = routingConfig.accessLevels;

	$routeProvider.when('/', 
		{
			templateUrl: 'home', 
			controller:'HomeCtrl', 
			access: access.user
		});

	$routeProvider.when('/login', 
		{
			templateUrl: 'login', 
			controller: 'LoginCtrl',
			access: access.anon
		});

	$routeProvider.when('/404',
        {
            templateUrl: '404',
            access: access.public
        });
	
	$routeProvider.otherwise({redirectTo:'/404'});

	$locationProvider.html5Mode(true);

}]);

