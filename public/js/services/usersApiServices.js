var api = angular.module('usersApiServices', [])

api.factory('usersApi', ['$http', function ($http) {
  var baseUrl = '/api/users';
  var usersApi = {}
  usersApi.getAll = function (user) {
    return $http.get(baseUrl);
  }
  usersApi.createUser = function (user) {
    return $http.post(baseUrl, {user: user})
  }
  usersApi.auth = function (username, password) {
    return $http.post(baseUrl+'/authenticate', {username: username, password: password})
  }
  return usersApi;
}])
