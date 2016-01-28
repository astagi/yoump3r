angular.module('yoump3r.services.client', [])
  .service('yoump3rclient', ['$q', '$http', function($q, $http) {

    var urlBase = '/api/v1';

    this.searchSong = function (query, canceler) {
      return $http.get(
        urlBase + '/songs/search/?q=' + query,
        {timeout: canceler.promise}
      );
    };

    this.getDownloadLink = function (videoUrl) {
      var deferred = $q.defer();
      $http.get(
        'https://www.youtubeinmp3.com/fetch/?format=JSON&video=' + videoUrl
      ).success(function(data){
        if (data.link) {
          data.link = data.link.replace('http:', 'https:');
        }
        console.log(data.link);
        deferred.resolve(data.link);
      }).error(function(data){
        deferred.reject(undefined);
      });
      return deferred.promise;
    };

  }]);