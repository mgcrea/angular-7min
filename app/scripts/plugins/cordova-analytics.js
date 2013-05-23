'use strict';

angular.module('cordova.analytics', [])

  .service('$analytics', function($window, $q) {

    var qExec = function(name, args) {
      var deferred = $q.defer();
      if(!$window.cordova || ! $window.cordova.exec) return;
      $window.cordova.exec(function onSuccess(res) {
        deferred.resolve(res);
      }, function onError(err) {
        deferred.reject(err);
      }, 'GAPlugin', name, args);
      return deferred.promise;
    };

    // id = the GA account ID of the form 'UA-00000000-0'
    // period = the minimum interval for transmitting tracking events if any exist in the queue
    this.init = function(id, period) {
      return qExec('initGA', [id, period || 10]);
    };

    // category = The event category. This parameter is required to be non-empty.
    // eventAction = The event action. This parameter is required to be non-empty.
    // eventLabel = The event label. This parameter may be a blank string to indicate no label.
    // eventValue = The event value. This parameter may be -1 to indicate no value.
    this.trackEvent = function(category, eventAction, eventLabel, eventValue) {
      return qExec('trackEvent', [category, eventAction, eventLabel || '', eventValue || -1]);
    };

    // url = the URL of the page view
    this.trackPage = function(url) {
      return qExec('trackPage', [url]);
    };

    // index = the numerical index of the dimension to which this variable will be assigned (1 - 20)
    // value = the value of the variable you are logging
    this.setVariable = function(index, value) {
      return qExec('setVariable', [index, value]);
    };

    this.destroy = function(index, value) {
      return qExec('exitGA', []);
    };

  });
