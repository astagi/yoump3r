  var yoump3rApp = angular.module('yoump3r', ['yoump3r.services.client', 'yoump3r.controllers', 'yoump3r.components']);
  yoump3rApp.config(['$httpProvider', '$sceDelegateProvider', function($httpProvider, $sceDelegateProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      'https://www.youtubeinmp3.com/**'
    ]);
  }]);