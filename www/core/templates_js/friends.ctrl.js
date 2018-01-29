/*angular
    .module('appSeeme.friends', [])
    .controller("friendsCtrl", function($scope,$rootScope, $http, $location,$window,connectGETService) {
$scope.controller='friends';

$scope.getFriends=function(){	
				connectGETService.fn($scope.controller + '/getallfriends' ).then(function(data) {
					console.log(data.data);
								$scope.friends=data.data;
								}, function(e) {
								});
				
}
$scope.init = function() {
			$scope.getFriends();
			
		}();
});*/

angular
    .module('appSeeme.friends', [])
    .controller("friendsCtrl", function($scope,$rootScope, $http, $location,$window,connectGETService) {
            $scope.controller='friends';
   
	
$scope.getFriends=function(){   
                connectGETService.fn($scope.controller + '/getallfriends' ).then(function(data) {
                    console.log(data.data.friends);
                     $rootScope.friends=data.data.friends;
					debugger;

				if(!$scope.friends)
					{
				    console.log('no friends');
					return;
					}
					$rootScope.friendsLen=$rootScope.friends.length;
                 for (var i=0; i < $scope.friends.length; i++) {
					 if($scope.friends[i].date&&typeof  $scope.friends[i].date=='string'){
						   $scope.friends[i].date=new Date($scope.friends[i].date);
					 
					 console.log( $scope.friends[i].date+'   \n');
					 }
                 
                 }  
                      $scope.$apply();         
                                }, function(e) {
                                });
                
}

$scope.getFriends();
$scope.toggleOpen=false;
$scope.topCenter=88;
$scope.topObj={
    'top':$scope.topCenter+'px'
};
$scope.setToggle=function(friend,index){
    $scope.toggleOpen=!$scope.toggleOpen;
    if(friend!=undefined){
	$scope.currFriend=friend;
    $scope.imageCenter=friend.imageCamera;
	}
    // if(index!=undefined)
    // $scope.topObj.top=$scope.topCenter*(index+1);
    
}



});

