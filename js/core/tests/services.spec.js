describe('Service: yoump3rclient', function () {

  beforeEach(module('yoump3r.services.client'));

  var yoump3rclient, $httpBackend;

  beforeEach(inject(function (_yoump3rclient_,  _$httpBackend_) {
    yoump3rclient = _yoump3rclient_;
    $httpBackend = _$httpBackend_;
  }));

  it('should fucking work', function () {
    expect(yoump3rclient).toBeDefined();
  });

  it('should be able to search songs', function () {
    var songs;
    var query = 'ciao';
    var expectedResponse = [{}, {}, {}];

    $httpBackend.when('GET', '/api/v1/songs/search/?q=' + query).respond(expectedResponse);
    $httpBackend.expectGET('/api/v1/songs/search/?q=' + query);

    yoump3rclient.searchSong(query, {promise: undefined})
    .success(function (data) {
      songs = data;
    });

    $httpBackend.flush();
    expect(expectedResponse).toEqual(songs);
  });

  it('should be able to search songs', function () {
    var link;
    var videoUrl = 'ciao';
    var videoSearchResponse = {
      link: 'http://ciao.com'
    };

    $httpBackend.when('GET', '/api/v1/songs/link/?video=' + videoUrl).respond(videoSearchResponse);
    $httpBackend.expectGET('/api/v1/songs/link/?video=' + videoUrl);

    yoump3rclient.getDownloadLink(videoUrl)
    .then(function (data) {
      link = data;
    });

    $httpBackend.flush();
    expect(link).toEqual('https://ciao.com');
  });

  it('should call the reject callback on error', function () {
    var called = false;
    var videoUrl = 'ciao';

    $httpBackend.when('GET', '/api/v1/songs/link/?video=' + videoUrl).respond(500, 'error');
    $httpBackend.expectGET('/api/v1/songs/link/?video=' + videoUrl);

    yoump3rclient.getDownloadLink(videoUrl)
    .then(undefined,function (data) {
      called = true;
    });

    $httpBackend.flush();
    expect(called).toEqual(true);
  });

});