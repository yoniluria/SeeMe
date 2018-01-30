
var applic=(function () {
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
    
    .run(['$rootScope','$location','$window','$http','$route','$cordovaOauth','connectGETService','connectPOSTService','$filter', function ($rootScope,$location,$window,$http,$route,$cordovaOauth, connectGETService,connectPOSTService,$filter) {
        window.cordovaOauth = $cordovaOauth;
        window.http = $http;
		$rootScope.appUrl='http://develop.sayyes.co.il/see_me_app/#/';
		$rootScope.imageUrl='http://develop.sayyes.co.il/see_me_app/common/assets/images/';
		$rootScope.url = "http://develop.sayyes.co.il/see-me/web/index.php?r=";
        var token=localStorage.getItem("token");
        if(!token){
            $location.path('/login');
            
        }
		
        $rootScope.getVarsLen=function(){   
                connectGETService.fn('friends/get_friends_len' ).then(function(data) {
				console.log(data.len);
			$rootScope.friendsLen=data.data!='false'?parseInt(data.data.len):0;
			
					
               }, function(e) {
                                });
			  connectGETService.fn('friends/get_visitors_len' ).then(function(data) {
				console.log(data.len);
			   $rootScope.visitorsLen=data.data!='false'?parseInt(data.data.len):0;
			
               }, function(e) {
                                });
                
}
        
        
        
       $rootScope.getVarsLen();
         var connectme=localStorage.getItem("token");
             if(!connectme)
             {$location.path('/login');}
             else
               {
                $rootScope.displayData(window.http,connectme);
               }
			
        
        $rootScope.title = "see-me";
		
		if($rootScope.usr==null && localStorage.getItem("usr")){
			$rootScope.usr = JSON.parse(localStorage.getItem("usr"));
		}
        $rootScope.routeTo = function(url) {
	     	console.log('routto ='+url);
			$window.location.href = url;
			document.getElementById("mySidenav").style.width = "0";
		}
		$rootScope.findById=function(id,arr){
			var i=0;
			$.grep(arr, function(b){
				if(b.id==id)
					return b;
				i++;
           
      })
			return false;
		}
		$rootScope.deleteUser=function(id){
		console.log(id+' koll');
				       connectGETService.fn('users/delete_user&user_id='+id).then(function(data) {
                            console.log(data.data);
                              if(data.data!='false') {
								 var $index= $rootScope.findById(id,$rootScope.friends).id;
						         if(!isNaN($index))
								  $rootScope.friends.splice($index,1);    
								  console.log($index+' i deleted him..');
							  }
								
                                }, function(e) {
                                });
			
			
		}
	
    $rootScope.displayData=function ($http, access_token)
	        {  $http.get("https://graph.facebook.com/v2.2/me", {params: {access_token: access_token ,fields: "id,about,age_range,picture,birthday,context,email    ,short_name,first_name,last_name,gender,hometown,link,location,middle_name,name,timezone,website,work", format: "json" }}).then(function(result) {
             
                console.log(result);
                var data={
                    name: result.data.name,
                    email:result.data.email,
                    imageProfil:result.data.picture.data.url
                };
               // $scope.user={imageProfil:result.data.picture.data.url};
                 connectPOSTService.fn( 'site/loginapp&facebook_id='+result.data.id,data).then(function(data) {
					console.log(data.data);
                    
                        $rootScope.user=data.data;

                     
                     document.getElementById('login-loading').style.display = "none";
                     document.getElementById('login-load').style.display = "block";
					
								}, function(e) {
                                        document.getElementById('login-loading').style.display = "none";
   document.getElementById('login-load').style.display = "block";
								});

	            }, function(error) {
                   document.getElementById('login-loading').style.display = "none";
                document.getElementById('login-load').style.display = "block";
                console.log('error');
	                console.log(error);
	            });
	        }
	
    }]);
    
})();

//applic.filter('optimitize',	function (){
//	return function (is,replaceTo){
//		return is==undefined?replaceTo:is;
//	}
//	});
	
