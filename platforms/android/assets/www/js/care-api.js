angular.module('starter.service', [])

/**
 * Wingz API
 */
.factory('$careApi', ['$http', '$q', '$timeout', function($http, $q, $timeout, $window){

  var $self = {};

  $self.version = '0.2.3';

  $self.baseUrl = "http://192.168.1.3:3000";

  document.addEventListener("deviceready", function(){

  });

  /**
   * Generic GET Method
   * @return promise
   */
  $self.get = function(service, params){
    var _title = '$careApi.get:'+service;
    var deferred = $q.defer();
    console.debug(_title+'[query]', params);

    var onSuccess = function(data, status, headers, config){
      if(data.error) {
        console.error(_title+'[error]', data, status, headers, config);
        deferred.reject(data.error, status, headers, config);
      }
      else {
        console.debug(_title+'[success]', data, status, headers, config);
        deferred.resolve(data, status, headers, config);
      }
    };

    var onError = function(data, status, headers, config){
      console.error(_title+'[promise.error]', data, status, headers, config);
      deferred.reject(data, status, headers, config);
    };

    var config = angular.extend({}, $self.$httpConfig, {params:params});
    $http.get($self.baseUrl + service, config)
      .success(onSuccess)
      .error(function(data, status, headers, config){
        if(status === 0) {
          data = 'Network error';
        }
        onError(data, status, headers, config);
      })
    ;
    return deferred.promise;
  };

  /**
   * Generic POST Method
   * @return promise
   */
  $self.post = function(service, params){
    var _title = '$careApi.post:'+service;
    var deferred = $q.defer();
    console.debug(_title+'[query]', params);

    var onSuccess = function(data, status, headers, config){
      if(data.error) {
        console.error(_title+'[error]', data, status, headers, config);
        deferred.reject(data.error, status, headers, config);
      }
      else {
        console.debug(_title+'[success]', data, status, headers, config);
        deferred.resolve(data, status, headers, config);
      }
    };

    var onError = function(data, status, headers, config){
      console.error(_title+'[promise.error]', data, status, headers, config);
      deferred.reject(data, status, headers, config);
    };

    var headers = {
      //'Content-Type': 'application/x-www-form-urlencoded'
      //'Content-Type': 'application/json'
    };
    var config = angular.extend({}, $self.$httpConfig, {headers:headers});
    $http.post($self.baseUrl + service, params, config)
      .success(onSuccess)
      .error(function(data, status, headers, config){
        if(status === 0) {
          data = 'Network error';
        }
        onError(data, status, headers, config);
      });
    return deferred.promise;
  };

  /**
   * Driver: find driver by referrer
   * @return promise
   */
  $self.login = function(email, password) {
    return $self.post('/auth/signin', {email:email,password:password});
  };

  /**
   * Driver: set a referrer according an ID
   * @return promise
   */
  $self.signup = function(username, email, password) {
    return $self.post('/auth/signup', {username:username,email:email,password:password});
  };

  return $self;

}])
;
