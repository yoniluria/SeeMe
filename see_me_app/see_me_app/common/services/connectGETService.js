
(function () {
  'use strict';

  angular.module('appSeeme.services')
    .service('connectGETService',  function($rootScope,$http,$location) {
     var dataStorage;//storage for cache
     
     
     return {fn:function(url) {
     		var header='12345';//localStorage.getItem("authKey");
	        return dataStorage =  	$http.get($rootScope.url+url,{
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