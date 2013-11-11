'use strict';

//Controllers
var ctrlApp = angular.module('angular-client-side-auth');

ctrlApp
.controller('NavCtrl', ['$rootScope', '$scope', '$location', 'Auth', function ($rootScope, $scope, $location, Auth) {
	$scope.user = Auth.user;
	$scope.userRoles = Auth.userRoles;
	$scope.accessLevels = Auth.accessLevels;

	$scope.logout = function () {
		Auth.logout(function () {
			$location.path('/login');
			console.log($scope.accessLevels);
		}, function () {
			$rootScope.error = "Failed to logout";
		});
	};
}]);



//angular.module('angular-client-side-auth')
ctrlApp.controller('HomeCtrl', ['$rootScope', '$scope', 'socket', function($rootScope, $scope, socket) {
	socket.on('welcome', function (data) {
		console.log(data);
	});
}]);

ctrlApp
.controller('RegisterCtrl', ['$rootScope', '$scope', '$location', 'Auth', function ($rootScope, $scope, $location, Auth) {
	$scope.role = Auth.userRoles.user;
	$scope.userRoles = Auth.userRoles;

	$scope.register = function () {
		Auth.register({
			username: $scope.username,
			password: $scope.password,
			role: $scope.role
		},
		function () {
			$location.path('/');
		},
		function (err) {
			$rootScope.error = err;
		});
	};
}]);

//angular.module('angular-client-side-auth')
ctrlApp.controller('LoginCtrl', ['$rootScope', '$scope', '$location', '$window', 'Auth', function ($rootScope, $scope,$location,$window,Auth) {
	
	$scope.rememberme = true;
	$scope.login = function () {
		Auth.login({
			username: $scope.username,
			password: $scope.password,
			rememberme: $scope.rememberme
		},
		function (res) {
			$location.path('/');
		},
		function (err) {
			$rootScope.error = "Failed to login";
		});
	};

	$scope.loginOauth = function (provider) {
		$window.location.href = '/auth/' + provider;
	}
}]);

ctrlApp
.controller('PrivateCtrl',['$scope', 
	function($scope) {
	}]);

ctrlApp
.controller('AdminCtrl', ['$rootScope', '$scope', 'socket', 'Users', 'Auth', 
	function ($rootScope,$scope, socket, Users, Auth) {
		$scope.loading = true;
		$scope.userRoles = Auth.userRoles;

		Users.getAll(function (res) {
			$scope.users = res;
			$scope.loading = false;
		}, function (err) {
			$rootScope.error = "Failed to fetch users.";
			$scope.loading = false;
		});

		$scope.startQuiz = function () {
			socket.emit('startQuizRequest', 'Start the quiz');
			console.log('startQuizRequest send');
		}

	}]);