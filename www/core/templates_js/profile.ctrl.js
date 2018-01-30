/*angular
    .module('appSeeme.profile', [])
    .controller("profileCtrl", function($scope,$rootScope, $http, $location,$window) {
$scope.controller='friends';});*/
var app= angular
    .module('appSeeme.profile', [])
    .controller("profileCtrl", function($scope,$rootScope, $http, $location,$window,connectGETService) {
$scope.controller='friends';
		$scope.inserted=false;
        console.log($rootScope.user);
 $rootScope.setMSG=function(msg){
	 if($rootScope.user)
		 msg=$rootScope.user.thinking;
	 $rootScope.$apply;
     connectGETService.fn($scope.controller + '/save_profile&msg='+msg).then(function(data) {
                    console.log(data.data);
                    if(data.data=='true'){
						$scope.inserted=true;
						if( $rootScope.user)
                        $rootScope.user.thinking=msg;
						$scope.inputColor='#fdda54';
						setTimeout(function(){
						$scope.inputColor='#696669';
							$scope.inserted=false;
						},1800)
					}
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

   
