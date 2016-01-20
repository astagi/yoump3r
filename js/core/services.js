angular.module('yoump3r.services.client', [])
  .service('yoump3rclient', ['$http', function($http) {

    var urlBase = '/api/v1';

    this.searchSongs = function (query) {
      return $http.get(urlBase + '/songs/search/?q=' + query);
    };

  }]);