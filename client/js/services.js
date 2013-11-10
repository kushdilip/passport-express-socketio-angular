'use strict';

var serviceApp = angular.module('angular-client-side-auth')
serviceApp.factory('Auth', ['$http', '$cookieStore', function ($http, $cookieStore) {
	
	var accessLevels = routingConfig.accessLevels
		, userRoles = routingConfig.userRoles
		, currentUser = $cookieStore.get('user') 
			|| { username: '', role: userRoles.public};

	$cookieStore.remove('user');
	
	function changeUser(user) {
			_.extend(currentUser, user);
		};

	return {
		authorize: function (accessLevel,role) {
			if (role === undefined) {
				role = currentUser.role;
			}

			return accessLevel.bitMask & role.bitMask;
		},

		isLoggedIn: function (user) {
			if (user === undefined) 
				user = currentUser;
			return user.role.title == userRoles.user.title || user.role.title == userRoles.admin.title;
		},

		register: function (user, success, error) {
			$http.post('/register', user).success(function (res) {
				changeUser(res);
				success();
			}).error(error);
		},

		login: function (user, success, error) {
			$http.post('/login',user).success(function (res) {
				changeUser(res);
				success();
			}).error(error);
		},

		logout: function (success,error) {
			$http.post('/logout').success(function () {
				changeUser({
					username: '',
					role: userRoles.public
				});
				success();
			}).error(error);
			console.log(currentUser);
		},
	
		accessLevels: accessLevels,
		userRoles: userRoles,
		user: currentUser
	};
}]);

//angular.module('angular-client-side-auth')
serviceApp.factory('Users', ['$http', function ($http) {

	return {
		getAll: function (success, error) {
			$http.get('/users').success(success).error(error);
		}
	};
}]);


serviceApp.factory('socket', function($rootScope) {
    var socket = io.connect();
    return {
        on: function(eventName, callback) {
            socket.on(eventName, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function(eventName, data, callback) {
            socket.emit(eventName, data, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    if(callback) {
                        callback.apply(socket, args);
                    }
                });
            });
        }
    };
});



