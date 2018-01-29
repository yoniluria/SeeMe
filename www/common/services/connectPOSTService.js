
(function () {
  'use strict';

  angular.module('appSeeme.services')
    .service('connectPOSTService',  function($rootScope,$http,$location) {
     var dataStorage;//storage for cache
    
     return {fn:function(url,data) {
     	 	var token=localStorage.getItem("token");
	        return dataStorage =  	$http.post($rootScope.url+url,data,{
   												 headers: {'TOKEN': token}
									})
			                         .then(function (response) {
							              return response;
							        },function (err) {
							        	if(err.status==401)
								             $location.path('/login');
								             else throw err;
								     });

    }
    }

});

  /** @ngInject */
  

})();