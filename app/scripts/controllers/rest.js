'use strict';

angular.module('$app')

  .controller('RestCtrl', function($scope, $location, $navigate, $routeParams, $countdown, audioFiles, workouts, workout) {
    $scope.step = $routeParams.step * 1;
    $scope.total = workout.list.length;
    $scope.next = '/step/' + ($scope.step + 1);

    $scope.rest = workout.rest;
    var workoutId = workout.list[$scope.step];
    $scope.workout = workouts.filter(function(workout) { return workout.id === workoutId; }).pop();

    $scope.duration = parseInt((workout.duration / workout.list.length) * (workout.rest.time), 10);
    $scope.timer = $scope.duration;
    var countdown = $countdown({scope: $scope, prop: 'timer', duration: $scope.duration, tick: function() { audioFiles.play('rest'); }, callback: function() {
      audioFiles.play('start');
      $scope.skip();
    }});

    $scope.paused = false;
    $scope.pauseText = function() {
      return $scope.paused ? 'Play' : 'Pause';
    };
    $scope.pause = function() {
      audioFiles.play('skip');
      countdown.toggle();
      $scope.paused = !$scope.paused;
    };
    $scope.skip = function() {
      audioFiles.play('skip');
      $navigate.go($scope.next, 'glueBottomFromTop');
    };

  });
