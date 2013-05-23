'use strict';

angular.module('$app')

  .service('audioFiles', function($window) {

    var files = {
      tick: {src: './sounds/tick.wav', volume: 0.35},
      rest: {src: './sounds/tick-rest.wav', volume: 0.05},
      start: {src: './sounds/newmail.wav', volume: 0.75},
      stop: {src: './sounds/mailsent.wav', volume: 0.75},
      skip: {src: './sounds/mailerror.wav', volume: 1},
    };

    angular.forEach(files, function(file) {
      file.audio = new $window.Media(file.src);
      if(file.volume) file.audio.volume = file.volume;
    });

    this.play = function(file) {
      if(!files[file]) return false;
      files[file].audio.play();
    };

  })

  .factory('$countdown', function() {

    function CountdownFactory(options) {

      var defaults = {
        interval: 1000
      };

      var Countdown = function(options) {
        this.options = angular.extend({}, defaults, options);
        return this.init(options);
      };

      Countdown.prototype = {

        constructor: Countdown,

        init: function(initOptions) {

          var that = this,
              options = this.options,
              $scope = this.options.scope;

          $scope[options.prop] = parseInt(options.duration || $scope[options.prop], 10);

          this.start();
          $scope.$on('$destroy', function() {
            that.stop();
          });

          return this;

        },

        toggle: function() {

          var that = this,
              options = this.options,
              $scope = this.options.scope;

          if(!$scope[options.prop]) return;
          this.interval ? this.stop() : this.start();
        },

        start: function() {

          var that = this,
              options = this.options,
              $scope = this.options.scope;

          this.interval = setInterval(function() {
            $scope.$apply(function() {
              $scope[options.prop]--;
              if(!$scope[options.prop]) {
                that.stop();
                if(angular.isFunction(options.callback)) {
                  options.callback.call(null);
                }
              } else {
                if(angular.isFunction(options.tick)) {
                  options.tick.call(null);
                }
              }
            });
          }, options.interval);
        },

        stop: function() {
          clearInterval(this.interval);
          this.interval = undefined;
        }

      };

      return new Countdown(options);

    }

    return CountdownFactory;

  });