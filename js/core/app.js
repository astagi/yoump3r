var yoump3rApp = angular.module('yoump3r', ['yoump3r.services.client', 'yoump3r.controllers', 'yoump3r.components']);
yoump3rApp.config(['$httpProvider', '$sceDelegateProvider', function($httpProvider, $sceDelegateProvider) {
  $httpProvider.defaults.xsrfCookieName = 'csrftoken';
  $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    'https://www.youtubeinmp3.com/**'
  ]);
}]);

//var myAppDev = angular.module('appdev', ['yoump3r', 'ngMockE2E']);
//myAppDev.run(['$httpBackend',
//  function ($httpBackend) {
//    $httpBackend.whenGET('/api/v1/songs/search/?q=David').respond([{}, {}, {}]);
//    $httpBackend.whenGET(/^\/static\/.*/).passThrough();
//  }
//]);

angular.element(document).ready(function() {
  angular.bootstrap(document, ['yoump3r']);
});