angular
    .module('appSeeme.visitors', [])
    .controller("visitorsCtrl", function($scope,$rootScope, $http, $location,$window,connectGETService,connectPOSTService) {
$scope.controller='friends';
  var geolocationTry_i = 0; 
     $scope.dbLat=0;
    $scope.dbLng=0;
 $scope.lng;
    $scope.lat;
    
    
    
    
    
$scope.getLocation=function () { 
    if (navigator.geolocation) {
        var options = {

                enableHighAccuracy: true,

                 timeout: 15000,

                 maximumAge: 0

         };

         try {

                 navigator.geolocation.getCurrentPosition(function (position) {
                     console.log("get Location");
                      console.log(position.coords.latitude);
                     console.log(position.coords.longitude);
                    $scope.lng= position.coords.longitude;
                     $scope.lat= position.coords.latitude;
 var distance=getDistanceFromLatLonInKm($scope.dbLat,$scope.dbLng,$scope.lat,$scope.lng);
                  console.log("distance:"+distance);
    if(distance>=0.05){ console.log("yes distance:"+distance);
        $scope.saveLocation();
                      $scope.getAllFriends();}
$scope.curruntLocation={lat:$scope.lat,lng:$scope.lng};
    $scope.addMarker($scope.curruntLocation);
                    
                  }, function () {

                       console.log( "position not found");

                  }, options);

          } catch (e) {

             console.log( "ooops");
       }

    }  
}
 $scope.saveLocation=function(){
     console.log("save");
     var data={location:{lat:$scope.lat,lng:$scope.lng}};
     connectPOSTService.fn($scope.controller + '/savelocation',data).then(function(data) {
					console.log(data.data);
			 $scope.dbLat=$scope.lat;
    $scope.dbLng=$scope.lng;

								}, function(e) {
								});    
 }
$scope.initializeMap=function(){
    
      if (navigator.geolocation) {
        var options = {

                enableHighAccuracy: true,

                 timeout: 15000,

                 maximumAge: 0

         };

         try {

                 navigator.geolocation.getCurrentPosition(function (position) {
   var myOptions = {
            zoom: 12,
            center:  {lat: position.coords.latitude,lng: position.coords.longitude},
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        $scope.map = new google.maps.Map(document.getElementById("map"), myOptions);
    console.log($scope.map);
                  }, function () {

                       console.log( "position not found");

                  }, options);

          } catch (e) {

             console.log( "ooops");
       }

    }  
   // var myLatlng = new google.maps.LatLng($scope.lat,$scope.lng);
      
    //$scope.curruntLocation={lat:$scope.lat,lng:$scope.lng};
    //$scope.addMarker($scope.curruntLocation);
}
$scope.addMarker=function (location) {
    console.log("add marker"); console.log(location);
        marker = new google.maps.Marker({
            position: location,
            map:$scope.map
        });
    }
$scope.getAllFriends=function(){
	connectGETService.fn($scope.controller + '/getallallfriends' ).then(function(data) {
				console.log("get friends");	console.log(data.data);
        		$scope.friends=data.data;
        angular.forEach($scope.friends,function(friend){
            var location={lat:parseFloat(friend.lat),lng:parseFloat(friend.lng)};
				$scope.addMarker(angular.fromJson(location));
			});

								}, function(e) {
								});    
}
/*$scope.checkLocation=function(){
   console.log("check Location");console.log($scope.lat);console.log($scope.lng);
    $scope.getLocation();
    var distance=getDistanceFromLatLonInKm($scope.dbLat,$scope.dbLng,$scope.lat,$scope.lng);
                  console.log("distance:"+distance);
    if(distance>=0.05){ console.log("yes distance:"+distance);
        $scope.saveLocation();}
}*/
function deg2rad(deg) {
  return deg * (Math.PI/180)
}
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}
$scope.init = function() {
     $scope.initializeMap();
	$scope.getLocation();
   // $scope.saveLocation();
	//$scope.getAllFriends();
   
    
    //will work all the time the application runing
    setInterval(function(){
  $scope.getLocation();
 // $scope.getAllFriends();
}, 60000);
		}();                
               
               
               
               
} );