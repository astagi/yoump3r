angular.module('yoump3r.controllers', ['yoump3r.services.client'])

.controller('MainController', ['$scope', function($scope) {

}])

.controller('CreatePlaylistController', ['$scope', 'yoump3rclient', function($scope, yoump3rclient) {

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

}]);