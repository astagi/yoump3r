var MockBackendE2E = require('./mockbackende2e');
var backend;


describe('yoump3r home page', function() {

  beforeEach(function() {
    backend = new MockBackendE2E(browser);
    backend.commonMock(function(httpBackend) {
      httpBackend.whenGET(/^\/static\/.*/).passThrough();
      httpBackend.whenGET(/^\/api\/v1\/songs\/search\/\?q=$/).respond([]);
      httpBackend.whenGET(/^\/api\/v1\/songs\/search\/\?q=.*/).respond([{}, {}, {}]);
    });
  });

  afterEach(function() {
    backend.clear();
  });

  it('should load the page', function() {
    backend.mock();
    browser.get('http://localhost:8000');
    expect(browser.getTitle()).toEqual('New playlist');
  });

  it('should add a new song clicking on add', function() {
    backend.mock();
    browser.get('http://localhost:8000');
    element(by.css('.btn-add')).click();
    element(by.css('.btn-add')).click();
    element(by.css('.btn-add')).click();
    var songInputs = element.all(by.css('song-row'));
    expect(songInputs.count()).toEqual(4);
  });

  it('should remove a new song clicking on remove', function() {
    backend.mock();
    browser.get('http://localhost:8000');
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
    backend.mock();
    browser.get('http://localhost:8000');
    var directives = element.all(by.repeater('song in songs'));
    directives.first().element(by.model('songSearch')).sendKeys('Bowie');
  });

  it('should remove show suggested button if youtube result is empty', function() {
    backend.mock();
    browser.get('http://localhost:8000');
    var directives = element.all(by.repeater('song in songs'));
    var firstDirectiveInput = directives.first().element(by.model('songSearch'));
    expect(element(by.css('.btn-suggested')).isDisplayed()).toBeFalsy();
    firstDirectiveInput.sendKeys('Bowie');
    expect(element(by.css('.btn-suggested')).isDisplayed()).toBeTruthy();
    firstDirectiveInput.clear();
    expect(element(by.css('.btn-suggested')).isDisplayed()).toBeFalsy();
  });

  it('should show only error on blank link', function() {
    backend.mock(function(httpBackend) {
      httpBackend.whenGET(/^\/api\/v1\/songs\/link\/\?video=.*/).respond(
        {'link': '/api/v1/songs/notfound/'}
      );
    });
    browser.get('http://localhost:8000');
    var directives = element.all(by.repeater('song in songs'));
    var directive = directives.first();
    var firstDirectiveInput = directive.element(by.model('songSearch'));
    firstDirectiveInput.sendKeys('Null');
    var downloadButton = directive.element(by.css('.btn-download'));
    downloadButton.click();
    var errorNotFound = directive.element(by.css('.error-not-found'));
    expect(errorNotFound.isDisplayed()).toBeTruthy();
  });

  it('should show error on video too long', function() {
    backend.mock(function(httpBackend) {
      httpBackend.whenGET(/^\/api\/v1\/songs\/link\/\?video=.*/).respond(
        {'link': '/api/v1/songs/videotoolong/'}
      );
    });
    browser.get('http://localhost:8000');
    var directives = element.all(by.repeater('song in songs'));
    var directive = directives.first();
    var firstDirectiveInput = directive.element(by.model('songSearch'));
    firstDirectiveInput.sendKeys('Null');
    var downloadButton = directive.element(by.css('.btn-download'));
    downloadButton.click();
    var errorNotFound = directive.all(by.css('.error-not-found'));
    expect(errorNotFound.get(1).isDisplayed()).toBeTruthy();
  });

  it('should change iframe source on single download', function() {
    backend.mock(function(httpBackend) {
      httpBackend.whenGET(/^\/api\/v1\/songs\/link\/\?video=.*/).respond(
        {'link': 'http://www.youtubeinmp3.com/linksong'}
      );
    });
    browser.get('http://localhost:8000');
    var directives = element.all(by.repeater('song in songs'));
    var directive = directives.first();
    var firstDirectiveInput = directive.element(by.model('songSearch'));
    firstDirectiveInput.sendKeys('Song I want');
    var downloadButton = directive.element(by.css('.btn-download'));
    downloadButton.click();

    var iframe = directive.element(by.css('iframe'));
    iframe.getAttribute('src').then(function(attr) {
      expect(attr).toBe("http://www.youtubeinmp3.com/linksong");
    });

  });

});
