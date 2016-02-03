describe('yoump3r home page', function() {

  beforeEach(function() {
    browser.get('http://localhost:8000');
    browser.addMockModule('httpMocker', function() {
      angular.module('httpMocker', ['ngMockE2E'])
      .run(function($httpBackend) {
        $httpBackend.whenGET('http://jsonplaceholder.typicode.com/photos')
          .respond([
            {
              albumId: 1,
              id: 1,
              title: "accusamus beatae ad",
              url: "http://placehold.it/600/92c952",
              thumbnailUrl: "http://placekitten.com/g/200/300"
            }
          ])
      })
    });
  });

  it('should load the page', function() {
    expect(browser.getTitle()).toEqual('New playlist');
  });

  it('should add a new song', function() {
    expect(browser.getTitle()).toEqual('New playlist');
  });

});