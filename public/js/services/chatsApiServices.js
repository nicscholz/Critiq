var api = angular.module('chatsApiServices', [])

api.factory('chatsApi', ['$http', function ($http) {
  var baseUrl = '/api/chats';
  var chatsApi = {}

  chatsApi.getAll = function (user) {
    return $http.get(baseUrl);
  }
  chatsApi.createChat = function (user) {
    return $http.post(baseUrl, {chat: chat})
  }
  return chatsApi;
}])
