angular.module('yoump3r.components', ['yoump3r.services.client', 'yoump3r.filters'])

.directive('songRow', ['yoump3rclient', function (yoump3rclient) {
  return {
    scope: {
      ngModel: '=',
      onDeleteSong: '&'
    },
    templateUrl: '/static/partials/songrow.html',
    controller: ['$scope', '$element', '$timeout', '$q', function ( $scope, $element, $timeout, $q ) {
      $scope.selectedSong = {};
      $scope.suggestedSongs = [];
      $scope.song = '';
      $scope.artist = '';
      $scope.title = '';
      $scope.downloadMp3Url = '';
      $scope.qTimeout;
      $scope.qHttp;
      $scope.downloadSong = function () {
        $scope.downloadMp3Url = 'http://www.youtubeinmp3.com/download/?video=https://www.youtube.com/watch?v=' + $scope.selectedSong.id + '&autostart=1';
      };
      $scope.selectSong = function (song) {
        $scope.selectedSong = song;
      };
      $scope.searchSong = function () {
        $scope.title = $scope.artist + ' - ' + $scope.song;
        if ( $scope.qTimeout ) {
          $timeout.cancel($scope.qTimeout);
        }
        if ( $scope.qHttp ) {
          $scope.qHttp.resolve();
        }
        $scope.qHttp = $q.defer();
        $scope.qTimeout = $timeout(function () {
          yoump3rclient.searchSong($scope.title, $scope.qHttp)
          .success(function (songs) {
            console.log(songs);
            $scope.suggestedSongs = songs;
          })
          .error(function (error) {
            console.log(error);
          });
        }, 200);
      };
    }]
  };
}])