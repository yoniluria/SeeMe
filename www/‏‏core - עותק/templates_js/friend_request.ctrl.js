angular
    .module('appSeeme.friend_request', [])
    .controller("friend_requestCtrl", function($scope,$rootScope, $http, $location,$window,$state) {
$scope.controller='friend';
$scope.uploadImage = function(event) {
			if (!event.target.files || event.target.files.length == 0)
				return;
			var formData = new FormData();
			formData.append("file", event.target.files[0]);
			uploadImageService.fn($scope.controller + '/uploadimage', formData).then(function(data) {
				$rootScope.settings.image_file = data.data;
				$state.reload();

			}, function(e) {
			});
			//document.getElementById('upload').value = '';
		};
});