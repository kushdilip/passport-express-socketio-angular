'use strict'

var dirctvApp = angular.module('angular-client-side-auth');

//angular.module('angular-client-side-auth')
dirctvApp.directive('accessLevel', ['Auth', function (Auth) {
	return {
		restrict: 'A',
		link: function ($scope, element, attrs) {
			var prevDisp = element.css('display')
			,userRole
			,accessLevel;

			$scope.user = Auth.user;
			$scope.$watch('user', function (user) {
				if(user.role)
					userRole = user.role;
				updateCSS();
			}, true);

			attrs.$observe('accessLevel', function (al) {
				if (al) accessLevel = $scope.$eval(al);
				updateCSS();
			});

			function updateCSS () {
				// console.log(userRole);
				// console.log(accessLevel);
				if (userRole && accessLevel) {
					if (!Auth.authorize(accessLevel, userRole)) 
						element.css('display', 'none');
					else
						element.css('display', prevDisp);
				}
			}
		}
	};
}]);

//angular.module('angular-client-side-auth')
dirctvApp.directive('activeNav', ['$location', function ($location) {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			var nestedA = element.find('a')[0];
			var path = nestedA.href;

			scope.location = $location;
			scope.$watch('location.absUrl()', function (newPath) {
				if (path === newPath) {
					element.addClass('active');
				}
				else{
					element.removeClass('active');
				}
			});
		}
	};
}]);

dirctvApp
.directive('activeQuiz', ['Quiz','socket', function (Quiz, socket) {
	return {
		restrict: 'A',
		link: function ($scope, element, attrs) {
			element.css('display', 'none');
			socket.on('startQuiz', function (data) {
				console.log('Starting the quiz');
				element.css('display', 'inline');
				
				Quiz.getNextQuestion(function (res) {
					console.log('received question');
				}, function (err) {
					$rootScope.error = "Failed to fetch users.";
				});
			});
		}
	};
}])