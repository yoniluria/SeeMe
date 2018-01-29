(function () {
    'use strict';
    angular.module('appSeeme.friends', []);
    angular.module('appSeeme.login', []);
    angular.module('appSeeme.chats', []);
    angular.module('appSeeme.friend_request', []);
    angular.module('appSeeme.visitors', []);
    angular.module('appSeeme.profile', []);
    angular.module('appSeeme.services', []);
    angular.module('appSeeme', [
    'ngRoute',
    'facebook',
    'ngCordova', 
    'ngCordovaOauth',
    'appSeeme.friends',
    'appSeeme.login',
    'appSeeme.chats',
    'appSeeme.friend_request',
    'appSeeme.visitors',
    'appSeeme.profile',
    'appSeeme.services',
    ])
    
    .run(['$rootScope','$location','$window','$http','$route', function ($rootScope,$location,$window,$http,$route) {
        $rootScope.title = "see-me";
		$rootScope.url = "http://develop.sayyes.co.il/see-me/web/index.php?r=";
		if($rootScope.usr==null && localStorage.getItem("usr")){
			$rootScope.usr = JSON.parse(localStorage.getItem("usr"));
		}
$rootScope.routeTo = function(url) {
			$window.location.href = url;
			document.getElementById("mySidenav").style.width = "0";
		}
	
    }]);
    
})();
