describe('Controller: Create Playlist', function() {
  var scope, $location, createController;

  beforeEach(module('yoump3r.controllers'));

  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();

    createController = function() {
      return $controller('CreatePlaylistController', {
        '$scope': scope
      });
    };
  }));

  it('should have one song by default', function() {
    var controller = createController();
    expect(scope.songs.length).toBe(1);
  });

  it('should be able to add a new song', function() {
    var controller = createController();
    scope.addNewSong();
    expect(scope.songs.length).toBe(2);
  });

  it('should be able to delete a song', function() {
    var controller = createController();
    scope.addNewSong();
    scope.addNewSong();
    scope.addNewSong();
    for (var i = 0 ; i < scope.songs.length ; i++) {
      scope.songs[i].$$hashKey = i;
    }
    expect(scope.songs.length).toBe(4);
    scope.deleteSong(scope.songs[1]);
    expect(scope.songs.length).toBe(3);
  });

});