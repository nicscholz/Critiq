var ctrl = angular.module('mainControllers', ['ngCookies']);

ctrl.controller('mainController', ['$scope','$http','$cookies','usersApi', 'chatsApi', function ($scope, $http, $cookies, usersApi, chatsApi) {

  $scope.users = [];
  $scope.topics = [
     {
        name:  "Uber",
        url: "http://static4.businessinsider.com/image/56b10947c08a80880e8be83c-750-375/img_3627.png"
     },
     {
        name: "Kanye West Album Drop",
        url: "https://cdn0.vox-cdn.com/thumbor/_-Tk3Oysa8xZGd7ZM4ov85Z6u6A=/0x271:1024x954/1280x854/cdn0.vox-cdn.com/uploads/chorus_image/image/48799109/TLOPGenerator.0.0.png"
     }
 ]

 $scope.initChat = function( activeTopicIdx ) {
    $scope.showChat = true;
    $scope.activeTopic = $scope.topics[activeTopicIdx];
}

  $scope.createUser = function(user){
    usersApi.createUser(user).then(function (response) {
      $scope.user = {};
      $scope.logIn(user.username, user.password);
    })
  }

  $scope.logIn = function(username, password) {
    usersApi.auth(username, password).then(function(response) {
      if(response.data.token){
        $scope.cookieStuff(response)
        $scope.setUser(response)
      }else {
          $scope.username=''; $scope.password='';
      }
    })
  }

  $scope.newChat = function( chat ) {
    user.username = $cookies.get('user');
    usersApi.create(user).then(function (response) {
      $scope.chats.push(response.data)
      $scope.user={};
    })
  }

  $scope.getUsers = function () {
    usersApi.getAll().then(function (response) {
      $scope.users = response.data.users;
    })
  }
  $scope.setUser = function(response){
    $scope.currentUser = response.config.data.username;
    $scope.logged=true;
    $scope.username='';
    $scope.password='';
  }
  $scope.cookieStuff = function (response) {
    $cookies.put('user', response.config.data.username);
    $cookies.put('token', response.data.token);
  }
  $scope.logOut = function () {
    $cookies.remove('user');
    $cookies.remove('token');
    $scope.currentUser = '';
    $scope.logged=false;
  }
  $scope.hideForm = function functionName() {
    if($scope.searchOnly){
      $scope.searchOnly = false;
    }else {
      $scope.searchOnly = true;
    }
  }

  $scope.checkToken = function() {
    var token = $cookies.get('token');
    if(token){
      $scope.logged=true;
      if($cookies.get('user')){
        $scope.currentUser=$cookies.get('user')
      }
    }
  }

  $scope.newChat = {};
  $scope.sendChat = function(){
     console.log($scope.newChat, $scope.currentUser);
     $scope.newChat.username = $scope.currentUser;
     $scope.socket.emit('send message', $scope.newChat);
     $scope.newChat = {};
  };

  $scope.socket = io.connect('localhost:3000');

  var init = function () {
      $scope.chats = [];

      $scope.socket.on('globally sent message', function(newChat){
        $scope.chats.push(newChat);
        $scope.$digest();
      });

      $scope.checkToken();
      $scope.searchOnly=false;
      $scope.getUsers();
  };
  init();
}])
