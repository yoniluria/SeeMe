angular
    .module('appSeeme.friends', [])
    .controller("friendsCtrl", function($scope,$rootScope, $http, $location,$window,connectGETService) {
$scope.controller='friends';
//$scope.friends=[{name:'ronen ro',thinking:'hi :)'},{name:'ronen ro',thinking:'hi :)'},{name:'ronen ro',thinking:'hi :)'}];

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
});