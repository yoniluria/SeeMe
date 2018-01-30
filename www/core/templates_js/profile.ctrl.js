/*angular
    .module('appSeeme.profile', [])
    .controller("profileCtrl", function($scope,$rootScope, $http, $location,$window) {
$scope.controller='friends';});*/
var app= angular
    .module('appSeeme.profile', [])
    .controller("profileCtrl", function($scope,$rootScope, $http, $location,$window,connectGETService) {
$scope.controller='friends';
        console.log($rootScope.user);
 $rootScope.setMSG=function(msg){
	    if($scope.myProfile&&$scope.myProfile!='')
			msg=$scope.myProfile;
     connectGETService.fn($scope.controller + '/save_profile&msg='+msg).then(function(data) {
                    console.log(data.data);
                    if(data.data=='true')
						if( $rootScope.user)
                        $rootScope.user.thinking=msg;
                               // $scope.chats=data.data.chats;
                                }, function(e) {
                                });
 }



});
app.directive( 'onEnterKey', function ($rootScope) {
    return function ( scope, element, attrs ) {
        element.bind( "keydown keypress", function ( e ) {
            if ( e.which === 13 ) {
              
                e.preventDefault();
                var msg=e.target.value;
                if(msg.replace(/\s/g, '').length)
                $rootScope.setMSG(msg);
                
             
            }
        } );
    };
} );

   
