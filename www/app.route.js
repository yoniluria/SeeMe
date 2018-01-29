(function () {
    'use strict';

    angular.module('appSeeme')
        .config(['$routeProvider', function config($routeProvider) {
        	
            $routeProvider
           .when('/friends', {
                controller: 'friendsCtrl',
                templateUrl: 'core/templates/friends.tmpl.html'
            })
           .when('/profile', {
	            controller: 'profileCtrl',
	            templateUrl: 'core/templates/profile.tmpl.html'
           })
           .when('/login', {
	            controller: 'loginCtrl',
	            templateUrl: 'core/templates/login.tmpl.html'
           })
           .when('/friend_request', {
	            controller: 'friend_requestCtrl',
	            templateUrl: 'core/templates/friend_request.tmpl.html'
           })
           .when('/visitors', {
	            controller: 'visitorsCtrl',
	            templateUrl: 'core/templates/visitors.tmpl.html'
           })
           .when('/chats', {
	            controller: 'chatsCtrl',
	            templateUrl: 'core/templates/chats.tmpl.html'

           }).
		when('/chats/:chatterId', {
       templateUrl: 'core/templates/chats.tmpl.html',
      controller: 'chatsCtrl'
            })
            .otherwise({
                redirectTo: '/chats'
            });
		
			
        }]);
})();
