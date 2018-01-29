/*<<<<<<< HEAD
angular.module('appSeeme.chats', []).controller("chatsCtrl", function($scope, $rootScope, $http, $location, $window) {
	$scope.controller = 'cahts';

	var Server;

	function log(text, isMe) {
		var dir = isMe == true ? 'right' : '';
		var arr = text.split("&id=");
		text = arr[0];
		var clientId = arr[1];
		var d = new Date();
		$('#chats-div').append('<div class="chat ' + dir + '">' + '<div class="inline">' + '<span class="f-left">' + d.getHours() + ':' + d.getMinutes() + '|' + d.getDate() + '.' + (d.getMonth() < 10 ? '0' : '') + d.getMonth() + '</span>' + '<span class="text-chat">' + text + '</span>' + '</div>' + '<div class="chat-img">' + '<img src="../see_me_app/common/assets/images/untitled' + clientId + '.jpg" />' + '</div>' + '</div>');

		// $log = $('#log');
		// //Add text to log
		// $log.append(($log.val() ? "\n" : '') + text);
		// //Autoscroll
		// $log[0].scrollTop = $log[0].scrollHeight - $log[0].clientHeight;
	}

	function send(text) {
		Server.send('message', text);
	}


	$(document).ready(function() {
		// log('Connecting...');

		log('מתחבר...&id=1', true);
		Server = new FancyWebSocket('ws://127.0.0.1:9300');

		$('#message').keypress(function(e) {
			if (e.keyCode == 13 && this.innerHTML) {
				log(this.innerHTML + '&id=' + 1, true);
				send(this.innerHTML);
				
				var el = document.getElementById("message");
				var range = document.createRange();
				var sel = window.getSelection();
				el.innerHTML = '\u00a0';
				range.selectNodeContents(el);
				range.setStart(el.childNodes[0], 0);
				range.collapse(false);
				sel.removeAllRanges();
				sel.addRange(range);
				
				// document.execCommand('delete', false, null);
				
				// document.getElementById("message").focus();
			}
			// var div = document.getElementById('message');
// setTimeout(function() {
    // div.focus();
// }, 0);

		});

		//Let the user know we're connected
		Server.bind('open', function() {
			// log("Connected.");
			log("התחבר&id=1", true);
		});

		//OH NOES! Disconnection occurred.
		Server.bind('close', function(data) {
			// log(".Disconnected");
			log("התנתק&id=1", true);
		});

		//Log any messages sent from server
		Server.bind('message', function(payload) {
			log(payload, false);
		});

		Server.connect();

		$('.box-img div img').click(function() {
			var src = $(this)[0].src;
			$('#message')[0].innerHTML += '<img style="height:24px; margin: 0; position: relative" src="' + src + '">';
		})
	});
});
=======*/
angular.module('appSeeme.chats', []).controller("chatsCtrl", function($scope, $rootScope, $http, $location, $window, $routeParams,connectGETService) {
	$scope.controller = 'chats';

	var Server;

	function log(text, isMe) {
		var dir = isMe == true ? 'right' : '';
		var arr = text.split("&id=");
		text = arr[0];
		var clientId = arr[1];
		var d = new Date();
		$('#chats-div').append('<div class="chat ' + dir + '">' + '<div class="inline">' + '<span class="f-left">' + d.getHours() + ':' + d.getMinutes() + '|' + d.getDate() + '.' + (d.getMonth() < 10 ? '0' : '') + d.getMonth() + '</span>' + '<span class="text-chat">' + text + '</span>' + '</div>' + '<div class="chat-img">' + '<img src="../see_me_app/common/assets/images/untitled' + clientId + '.jpg" />' + '</div>' + '</div>');

		// $log = $('#log');
		// //Add text to log
		// $log.append(($log.val() ? "\n" : '') + text);
		// //Autoscroll
		// $log[0].scrollTop = $log[0].scrollHeight - $log[0].clientHeight;
	}

	function send(text) {
		Server.send('message', text);
	}

	$scope.init=function()
	{
		var id,dat;
		if($routeParams.chatterId)
	     id=$routeParams.chatterId;
		       connectGETService.fn($scope.controller + '/getallchatsuniqe&friendId='+id ).then(function(data) {
				   try	{
            dat=JSON.parse(data.data);
				
			}catch(e){
				console.log(e+' didnt suvcess convert');
			}  
                 
                    $scope.chats=dat;
				   console.log('chast '+$scope.chats);
                               
                                }, function(e) {
                                });
                
	}
	$scope.init();

	$(document).ready(function() {
		// log('Connecting...');

		log('מתחבר...&id=1', true);
		Server = new FancyWebSocket('ws://127.0.0.1:9300');

		$('#message').keypress(function(e) {
			if (e.keyCode == 13 && this.innerHTML) {
				log(this.innerHTML + '&id=' + 1, true);
				send(this.innerHTML);
				
				var el = document.getElementById("message");
				var range = document.createRange();
				var sel = window.getSelection();
				el.innerHTML = '\u00a0';
				range.selectNodeContents(el);
				range.setStart(el.childNodes[0], 0);
				range.collapse(false);
				sel.removeAllRanges();
				sel.addRange(range);
				
				// document.execCommand('delete', false, null);
				
				// document.getElementById("message").focus();
			}
			// var div = document.getElementById('message');
// setTimeout(function() {
    // div.focus();
// }, 0);

		});

		//Let the user know we're connected
		Server.bind('open', function() {
			// log("Connected.");
			log("התחבר&id=1", true);
		});

		//OH NOES! Disconnection occurred.
		Server.bind('close', function(data) {
			// log(".Disconnected");
			log("התנתק&id=1", true);
		});

		//Log any messages sent from server
		Server.bind('message', function(payload) {
			log(payload, false);
		});

		Server.connect();

		$('.box-img div img').click(function() {
			var src = $(this)[0].src;
			$('#message')[0].innerHTML += '<img style="height:24px; margin: 0; position: relative" src="' + src + '">';
		})
	});
});
