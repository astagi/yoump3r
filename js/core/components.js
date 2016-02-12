angular.module('yoump3r.components', ['yoump3r.services.client', 'yoump3r.filters'])

.directive('songRow', ['$rootScope', '$timeout', '$q', 'yoump3rclient', function ($rootScope, $timeout, $q, yoump3rclient) {
  return {
    scope: {
      ngModel: '=',
      onDeleteSong: '&'
    },
    templateUrl: '/static/partials/songrow.html',
    link: function(scope, element, attrs) {
      scope.selectedSong;
      scope.showSuggestions = false;
      scope.suggestedSongs;
      scope.songSearch = '';
      scope.artist = '';
      scope.title = '';
      scope.downloadMp3Url = '';
      scope.qTimeout;
      scope.qHttp;
      scope.tabIndex = attrs.songRowTabindex;

      $rootScope.$on('downloadAll', function () {
        if (scope.selectedSong) {
          scope.downloadSong();
        }
      });

      scope.removeSong = function () {
        scope.onDeleteSong({deletedSong: scope.ngModel});
      };

      scope.canShowSuggestionToggle = function () {
        return (scope.suggestedSongs && scope.suggestedSongs.length != 0);
      };

      scope.toggleShowSuggestions = function() {
        scope.showSuggestions = !scope.showSuggestions;
      };

      scope.downloadSong = function () {
        scope.downloadMp3Url = '';
        scope.errorDownload = false;
        scope.externalLink = null;
        yoump3rclient
        .getDownloadLink('https://www.youtube.com/watch?v=' + scope.selectedSong.id)
        .then(function(link) {
          scope.downloadMp3Url = link;
        }, function(link) {
          scope.externalLink = link;
          scope.errorDownload = true;
        });
      };

      scope.selectSong = function (song) {
        scope.errorDownload = false;
        scope.externalLink = null;
        scope.selectedSong = song;
      };

      scope.searchSong = function () {
        if ( scope.qTimeout ) {
          $timeout.cancel(scope.qTimeout);
        }
        if ( scope.qHttp ) {
          scope.qHttp.resolve();
        }
        scope.qHttp = $q.defer();
        scope.qTimeout = $timeout(function () {
          yoump3rclient.searchSong(scope.songSearch, scope.qHttp)
          .success(function (songs) {
            scope.suggestedSongs = songs;
            scope.selectSong(songs[0]);
          })
          .error(function (error) {

          });
        }, 200);
      };
    },
  };
}])