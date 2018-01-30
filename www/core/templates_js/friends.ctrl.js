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

var a=angular
    .module('appSeeme.friends', [])
    .controller("friendsCtrl", function($scope,$rootScope, $http, $location,$window,connectGETService) {
            $scope.controller='friends';
   
	
$scope.getFriends=function(){   
                connectGETService.fn($scope.controller + '/getallfriends' ).then(function(data) {
                    console.log(data.data.friends);
                     $rootScope.friends=data.data.friends;
				

				if(!$scope.friends)
					{
				    console.log('no friends');
					return;
					}
					$rootScope.friendsLen=$rootScope.friends.length;
                 for (var i=0; i < $scope.friends.length; i++) {
					 if($scope.friends[i].date&&typeof  $scope.friends[i].date=='string'){
						   $scope.friends[i].date=new Date($scope.friends[i].date);
				         	$scope.friends[i].thinking=!$scope.friends[i].thinking?'':$scope.friends[i].thinking;
					 console.log( $scope.friends[i].date+'   \n');
					 }
                 
                 }  
                      //$scope.$apply();         
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
    $scope.imageCenter=friend.imageProfil;
	}
    // if(index!=undefined)
    // $scope.topObj.top=$scope.topCenter*(index+1);
    
}



});

a.filter('dinamicVal',function(){
	return function (myVal,DepandOn){
		return !myVal?DepandOn:myVal.length;
//		if (angular.isDefined(DepandOn))
//			return $scope[DepandOn].length||$rootScope[DepandOn].length;
//		return myVal;
			
	}
});