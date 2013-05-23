'use strict';

angular.module('$app')

  .constant('numbers', {
    ones: ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'],
    tens: ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'],
    teens: ['ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen']
  })

  .filter('firstWord', function() {
    return function(obj) {
      return obj.split(' ').shift();
    };
  })

  .filter('followingWords', function() {
    return function(obj) {
      return obj.split(' ').slice(1).join(' ');
    };
  })

  .filter('numberAsText', function(numbers) {
    return function(num) {
      if(!num) return 'zero';
      if (num < 10) return numbers.ones[num];
      else if (num >= 10 && num < 20) return numbers.teens[num - 10];
      else return numbers.tens[Math.floor(num / 10)] + ' ' + numbers.ones[num % 10];
    };
  });
