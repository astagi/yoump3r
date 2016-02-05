describe('yoump3r home page', function() {

  beforeEach(function() {
    browser.get('http://localhost:8000');
    browser.addMockModule('myModule', function() {
      angular.module('myModule', ['ngMockE2E'])
      .run(function($httpBackend) {
        $httpBackend.whenGET(/^\/api\/v1\/songs\/search\/\?q=$/).respond([]);
        $httpBackend.whenGET(/^\/api\/v1\/songs\/search\/\?q=.*/).respond([{}, {}, {}]);
        $httpBackend.whenGET(/^\/static\/.*/).passThrough();
      })
    });
  });

  it('should load the page', function() {
    expect(browser.getTitle()).toEqual('New playlist');
  });

  it('should add a new song clicking on add', function() {
    element(by.css('.btn-add')).click();
    element(by.css('.btn-add')).click();
    element(by.css('.btn-add')).click();
    var songInputs = element.all(by.css('song-row'));
    expect(songInputs.count()).toEqual(4);
  });

  it('should remove a new song clicking on remove', function() {
    element(by.css('.btn-add')).click();
    element(by.css('.btn-add')).click();
    element(by.css('.btn-add')).click();
    var removeButtons = element.all(by.css('.btn-remove'));
    removeButtons.get(0).click();
    removeButtons.get(0).click();
    var songInputs = element.all(by.css('song-row'));
    expect(songInputs.count()).toEqual(2);
  });

  it('should search on typing', function() {
    var directives = element.all(by.repeater('song in songs'));
    directives.first().element(by.model('songSearch')).sendKeys('Bowie');
  });

  it('should remove show suggested button if youtube result is empty', function() {
    var directives = element.all(by.repeater('song in songs'));
    var firstDirectiveInput = directives.first().element(by.model('songSearch'));
    expect(element(by.css('.btn-suggested')).isDisplayed()).toBeFalsy();
    firstDirectiveInput.sendKeys('Bowie');
    expect(element(by.css('.btn-suggested')).isDisplayed()).toBeTruthy();
    firstDirectiveInput.clear();
    expect(element(by.css('.btn-suggested')).isDisplayed()).toBeFalsy();
  });

});
