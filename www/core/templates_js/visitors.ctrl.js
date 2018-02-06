var app=angular
    .module('appSeeme.visitors', [])
    .controller("visitorsCtrl", function($scope,$rootScope, $http, $location,$window,connectGETService,connectPOSTService,$filter) {
    $scope.controller='friends';
    var geolocationTry_i = 0; 
    $scope.dbLat=0;
    $scope.dbLng=0;
    $scope.lng;
    $scope.lat;
    var marker;
    var markers =[];
    $rootScope.addToFriends=function(id)
	{
		console.log('id to be a friend='+ id);
		   connectGETService.fn( 'friends/add_friend&my_area_user='+id ).then(function(data) {
                    console.log(data.data);
			   if(data.data.data=='success')
				 {
				 $rootScope.friends.push(JSON.parse(data.data.friend));
                 $rootScope.friendsLen++;
                $rootScope.routeTo('#/chats');
				 }
			   else if(data.data.data=='already exists')
				   {
					   console.log('chatter!');
                     $rootScope.routeTo('#/chats/'+id);  
					 
				   }
               
			    //  $scope.apply();
				
		   }, function(e) {
        });
	}

   
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
                // if(distance>=0.05){ 
                console.log("yes distance:"+distance);
                $scope.saveLocation();
                //}
                $scope.curruntLocation={lat:$scope.lat,lng:$scope.lng};
                 if(!marker&&$rootScope.user){
                     marker = $scope.addMarker($scope.curruntLocation,$rootScope.user.name,$rootScope.user.imageProfil);
                 }
                 else{
                     marker.setPosition($scope.curruntLocation);
                 }
                //  $scope.getAllFriends();
                    
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
         if(data.data.status =="ok"){
             console.log(data.data);
             $scope.dbLat=$scope.lat;
             $scope.dbLng=$scope.lng;
             marker.setPosition({lat:$scope.lat,lng:$scope.lng});
         } 
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
            zoom: 15,
            center:  {lat: position.coords.latitude,lng: position.coords.longitude},
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        $scope.map = new google.maps.Map(document.getElementById("map"), myOptions);
        $scope.lng= position.coords.longitude;
        $scope.lat= position.coords.latitude;
        console.log($scope.map);
        $scope.curruntLocation={lat:$scope.lat,lng:$scope.lng};
        if(!marker){
             marker = $scope.addMarker($scope.curruntLocation,$rootScope.user.name,$rootScope.user.imageProfil);
        }
        else{
             marker.setPosition($scope.curruntLocation);
        }
          $scope.getAllFriends();
        }, function () {

               console.log( "position not found");

        }, options);

        } catch (e) {

             console.log( "ooops");
       }

    }  
}
$scope.addMarker=function (location,title,icon) {
    console.log("add marker"); console.log(location);
    var mkr = new google.maps.Marker({
        position: location,
        map:$scope.map,
        icon : icon,
        title : title
    });
    var infowindow = new google.maps.InfoWindow({
        content : title
    });
    mkr.addListener('click', function() {
        infowindow.open(map, mkr);
    });
    return mkr;
}



$scope.getAllFriends=function(){
	connectGETService.fn($scope.controller + '/getallusers' ).then(function(data) {
				console.log("get friends");	console.log(data.data);
        		$scope.visitors=data.data;
		$rootScope.visitorsLen=$scope.visitors.length;
        angular.forEach($scope.visitors,function(friend){
			       friend.toggle=true;
			friend.thinking=!friend.thinking?'':friend.thinking;
            var location={lat:parseFloat(friend.lat),lng:parseFloat(friend.lng)};
            if(markers[friend.id]){
               markers[friend.id].setPosition(location); 
            }
            else{
               markers[friend.id] = $scope.addMarker(location,friend.name,friend.imageProfil);
            }	
        });

    }, function(e) {
    });    
}
$scope.getAllFriends();
$scope. funcshowimgfriend=function (id) {

	var val=parseInt(angular.element($('#text-if-show'+id)).val());
    !val?angular.element($('#imgfriend'+id)).hide():angular.element($('#imgfriend'+id)).show();
     angular.element($('#text-if-show'+id)).val(!val);
	
}
$scope.funcloseimgfriend =function(id) {

	angular.element($('#imgfriend'+id)).hide();
    angular.element($('#text-if-show'+id)).val(0);
}
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
	//$scope.getLocation();    
    //will work all the time the application runing
    setInterval(function(){
  $scope.getLocation();
 // $scope.getAllFriends();
}, 10000);
		}();                
               
               
               
               
} );

app.filter('dinamicVal',function(){
	return function (myVal,DepandOn){
		return !myVal?DepandOn:myVal.length;			
	}
});


