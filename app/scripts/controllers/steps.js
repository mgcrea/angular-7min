'use strict';

angular.module('$app')

  .controller('StepsCtrl', function($scope, $location, $navigate, $routeParams, $countdown, $analytics, audioFiles, workouts, workout) {
    $scope.step = $routeParams.step * 1;
    $scope.total = workout.list.length;
    $scope.next = $scope.step < $scope.total ? '/rest/' + $scope.step : '/done';

    var workoutId = workout.list[$scope.step - 1];
    $scope.workout = workouts.filter(function(workout) { return workout.id === workoutId; }).pop();

    $scope.duration = parseInt((workout.duration / $scope.total) * (1 - workout.rest.time), 10);
    $scope.timer = $scope.duration;
    var countdown = $countdown({scope: $scope, prop: 'timer', duration: $scope.duration, tick: function() { audioFiles.play('tick'); }, callback: function() {
      audioFiles.play('stop');
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
    $scope.skipText = function() {
      return $scope.paused ? 'Restart' : 'Skip';
    };
    $scope.skip = function() {
      audioFiles.play('skip');
      if($scope.paused) {
        $scope.timer = $scope.duration;
        $scope.pause();
      } else {
        $navigate.go($scope.next, 'glueTopFromBottom'); // cubeToLeft
      }
      $analytics.trackEvent('workout', 'skip');
    };

  });
