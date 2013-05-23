'use strict';

angular.module('$app')

  .controller('AppCtrl', function($scope, $location, $navigate, $routeParams, $countdown, audioFiles, workouts, workout) {

    $scope.exit = function() {
      $navigate.go('/', 'cubeToLeft');
    };

  })

  .controller('MainCtrl', function($scope, $location, $navigate, $routeParams, $countdown, $analytics, audioFiles, workouts, workout) {

    $scope.timer = 3;
    $scope.next = '/step/1';
    $scope.countdown = false;
    $scope.workout = workout;

    $scope.startText = function() {
      return $scope.countdown ? $scope.timer : 'Start';
    };

    $scope.start = function() {
      audioFiles.play('tick');
      $scope.countdown = $countdown({scope: $scope, prop: 'timer', duration: 3, tick: function() { audioFiles.play('tick'); }, callback: function() {
        audioFiles.play('start');
        $navigate.go($scope.next, 'glueTopFromBottom'); // cubeToLeft
      }});
      $analytics.trackEvent('workout', 'start');
    };

    $scope.restart = function() {
      audioFiles.play('skip');
      $navigate.go($scope.next, 'glueTopFromBottom'); // cubeToLeft
      $analytics.trackEvent('workout', 'restart');
    };

    $scope.minus = function() {
      if(workout.duration <= 240) return;
      workout.duration -= 60;
    };
    $scope.plus = function() {
      if(workout.duration >= 1200) return;
      workout.duration += 60;
    };


  });
