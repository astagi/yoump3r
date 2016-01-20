angular.module('yoump3r.controllers', ['yoump3r.services.client'])

.controller('MainController', ['$scope', function($scope) {

}])

.controller('CreatePlaylistController', ['$scope', 'yoump3rclient', function($scope, yoump3rclient) {
  console.log('Hello yoump3r!');
  $scope.songs = [{}];
  $scope.deleteSong = function() {
  };
  $scope.addNewSong = function() {
    console.log('New song');
    $scope.songs.push({});
  };
}]);