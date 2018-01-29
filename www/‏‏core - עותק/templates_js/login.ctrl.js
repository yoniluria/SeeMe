angular
    .module('appSeeme.login', [])
    .controller("loginCtrl", function($scope,$rootScope, $http, $location,$window) {
$scope.controller='site';

   
      
       $scope.login=function()
            {
             var connectme=localStorage.getItem("access_token");
             if(!connectme)
				facebookLogin(window.cordovaOauth, window.http);
             else
               {
                displayData(window.http,connectme);
               }
			}

			function facebookLogin($cordovaOauth, $http)
			{
				$cordovaOauth.facebook("131181577586487", ["email", "public_profile"], {redirect_uri: "http://dev.sayyes.co.il/YartzeitApp"}).then(function(result){
                    localStorage.setItem("token", result.access_token);
                    alert(result.access_token);
                    displayData($http, result.access_token);
				},  function(error){
				});
			}
			
	        function displayData($http, access_token)
	        {  $http.get("https://graph.facebook.com/v2.2/me", {params: {access_token: access_token, fields: "id,about,age_range,picture,birthday,context,email    ,short_name,first_name,last_name,gender,hometown,link,location,middle_name,name,timezone,website,work", format: "json" }}).then(function(result) {
	            	var name = result.data.name;
	            	var gender = result.data.gender;
	            	var location = result.data.location;
	            	var picture = result.data.picture;
                console.log(result);
	            }, function(error) {
	                console.log(error);
	            });
	        }
	
  


    
 /*   
 window.cordovaOauth = $cordovaOauth;
  $scope.login = function ()
            {
             
             $scope.city = localStorage.getItem('city')&&localStorage.getItem('city')>=0?localStorage.getItem('city'):0;
                             var connectme=localStorage.getItem("access_token");
                          
                             facebookLogin(window.cordovaOauth, window.http);
           
                            // displayData(window.http,connectme);
                           
                         }
                                              function facebookLogin($cordovaOauth, $http)
                         {
                             $cordovaOauth.facebook("1870353356616079", ["email", "public_profile"], {}).then(function(result){//136162506926959
                                 alert("here2");
                                 localStorage.setItem("access_token", result.access_token);
                                 displayData($http, result.access_token);
                             },  function(error){
                                     alert("Error: " + error);
                             });
                         }
                                                          function displayData($http, access_token)
                         {  $http.get("https://graph.facebook.com/v2.2/me", {params: {access_token: access_token, fields: "id,about,age_range,picture,birthday,context,email    ,short_name,first_name,last_name,gender,hometown,link,location,middle_name,name,timezone,website,work", format: "json" }}).then(function(result) { alert("here2");
                                 var name = result.data.name;alert(name);
                                 var gender = result.data.gender;alert(gender);
                                 var location = result.data.location;alert(location);
                                 var picture = result.data.picture;alert(picture);
                                 profile=result.data;
                                 $scope.userr=profile;
                                 $scope.user=true;
             //                alert($scope.userr.id+" "+$scope.userr.short_name+" "+$scope.userr.email)
                                 var userToSave={facebookId:$scope.userr.id,
                                                   img:$scope.userr.picture.data.url,
                                                   username:$scope.userr.short_name,
                                                   email:$scope.userr.email};
                                   $scope.saveRegister(userToSave);
                             }, function(error) { alert("here2");
             //	                alert("There was a problem getting your profile.  Check the logs for details.");
                                 console.log(error);
                             });
             
             var expireDate = new Date();

			    expireDate.setDate(expireDate.getDate() + 1);

				$scope.token='12345';
             localStorage.setItem("token",$scope.token);
             
             localStorage.setItem("expires",expireDate);
	        }
*/











});