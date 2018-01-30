
(function () {
  'use strict';

  angular.module('appSeeme.services')
    .service('connectGETService',  function($rootScope,$http,$location) {
     var dataStorage;//storage for cache
     
     
     return {fn:function(url) {
     		var token=localStorage.getItem("token");
		 if(!token||isNaN(token))
			 token='12345';
	        return dataStorage =  	$http.get($rootScope.url+url,{
   												 headers: {'TOKEN': token},
				                                 withCredentials: true
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