
(function () {
  'use strict';

  angular.module('appSeeme.services')
    .service('connectPOSTService',  function($rootScope,$http,$location) {
     var dataStorage;//storage for cache
    
     return {fn:function(url,data) {
     	 	var header=localStorage.getItem("authKey");
	        return dataStorage =  	$http.post($rootScope.baseUrl+url,data,{
   												 headers: {'TOKEN': header}
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