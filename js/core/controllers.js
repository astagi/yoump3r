angular.module('yoump3r.controllers', ['yoump3r.services.client'])

.controller('MainController', ['$scope', function($scope) {

}])

.controller('CreatePlaylistController', ['$rootScope', '$scope', 'yoump3rclient', function($rootScope, $scope, yoump3rclient) {

  $scope.songs = [{}];

  $scope.deleteSong = function(deletedSong) {
    for (var i = 0 ; i < $scope.songs.length ; i++) {
      if ($scope.songs[i].$$hashKey == deletedSong.$$hashKey) {
        $scope.songs.splice(i, 1);
      }
    }
  };

  $scope.addNewSong = function() {
    $scope.songs.push({});
  };

  $scope.getSongsLength = function() {
    return $scope.songs.length;
  };

  $scope.downloadAllSongs = function() {
    $rootScope.$emit('downloadAll');
  };

}]);