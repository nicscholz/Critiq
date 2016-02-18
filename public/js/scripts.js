var app = angular.module('critiq', ['usersApiServices', 'chatsApiServices', 'mainControllers']);


//////// LOG-IN/LOG-OUT FUNCTIONALITY ////////
function login(usernameTry, passwordTry, callback){
  $.ajax({
    method: 'post',
    url: '/users/authenticate',
    data: {username: usernameTry, password: passwordTry},
    success: function(data){
      $.cookie('token', data.token);
      callback();
    }
  });
}

//////// LOG IN EVENT HANDLER ///////
function setLogInFormHandler(){
  $('form#log-in').on('submit', function(e){
    e.preventDefault();
    var usernameField = $(this).find('input[name="username"]');
    var passwordField = $(this).find('input[name="password"]');
    var username = usernameField.val();
    var password = passwordField.val();
    login(username, password, function(){
      console.log('The token is: ', $.cookie('token'));
      $('.create-profile-container').hide();
      $('.log-in-container').hide();
      $('.main-logo').hide();
      getUser();
      $('#display-profile').show();
    });
  });
}

//////// LOGS OUT THE USER ////////
function logOut(){
  $('#log-out').on('click', function(e){
    e.preventDefault();
    $.removeCookie('token');
    location.reload();
  });
}



////// SOCKETS CHAT ////////

//
// jQuery(function($){
// 			var socket = io.connect();
// 			var $messageForm = $('#send-message');
// 			var $messageBox = $('#message');
// 			var $chat = $('#chat');
//
// 			$messageForm.submit(function(e){
// 				e.preventDefault();
// 				socket.emit('send message', $messageBox.val());
// 				$messageBox.val('');
// 			});
//
// 			socket.on('new message', function(data){
// 				$chat.append(data + "<br/>");
// 			});
// 		});
//
// $(function(){
//    setMessageListeningHandler()
// });
