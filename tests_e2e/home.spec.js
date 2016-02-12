var MockBackendE2E = require('./mockbackende2e');
var backend;


describe('yoump3r home page', function() {

  beforeEach(function() {
    backend = new MockBackendE2E(browser);
    backend.mock(function(httpBackend) {
      httpBackend.whenGET(/^\/static\/.*/).passThrough();
      httpBackend.whenGET(/^\/api\/v1\/songs\/search\/\?q=$/).respond([]);
      httpBackend.whenGET(/^\/api\/v1\/songs\/search\/\?q=.*/).respond([{}, {}, {}]);
    });
  });

  it('should load the page', function() {
    browser.get('http://localhost:8000');
    expect(browser.getTitle()).toEqual('New playlist');
  });

  it('should add a new song clicking on add', function() {
    browser.get('http://localhost:8000');
    element(by.css('.btn-add')).click();
    element(by.css('.btn-add')).click();
    element(by.css('.btn-add')).click();
    var songInputs = element.all(by.css('song-row'));
    expect(songInputs.count()).toEqual(4);
  });

  it('should remove a new song clicking on remove', function() {
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
    browser.get('http://localhost:8000');
    var directives = element.all(by.repeater('song in songs'));
    directives.first().element(by.model('songSearch')).sendKeys('Bowie');
  });

  it('should remove show suggested button if youtube result is empty', function() {
    browser.get('http://localhost:8000');
    var directives = element.all(by.repeater('song in songs'));
    var firstDirectiveInput = directives.first().element(by.model('songSearch'));
    expect(element(by.css('.btn-suggested')).isDisplayed()).toBeFalsy();
    firstDirectiveInput.sendKeys('Bowie');
    expect(element(by.css('.btn-suggested')).isDisplayed()).toBeTruthy();
    firstDirectiveInput.clear();
    expect(element(by.css('.btn-suggested')).isDisplayed()).toBeFalsy();
  });

  it('should show error and link on bad video', function() {
    backend.mock(function(httpBackend) {
      httpBackend.whenGET(/^\/api\/v1\/songs\/link\/\?video=.*/).respond(
        404, {'link': 'http://myvideo.download/'}
      );
    });
    browser.get('http://localhost:8000');

    var directives = element.all(by.repeater('song in songs'));
    var directive = directives.first();
    var firstDirectiveInput = directive.element(by.model('songSearch'));
    firstDirectiveInput.sendKeys('Lucio');

    var linkVideoSuggested = directive.element(by.css('a[href="http://myvideo.download/"]'));
    expect(linkVideoSuggested.isPresent()).toBeFalsy();

    var downloadButton = directive.element(by.css('.btn-download'));
    downloadButton.click();

    expect(linkVideoSuggested.isDisplayed()).toBeTruthy();

    firstDirectiveInput.sendKeys('Battisti');
    expect(linkVideoSuggested.isPresent()).toBeFalsy();

  });

  it('should show only error on blank link', function() {
    backend.mock(function(httpBackend) {
      httpBackend.whenGET(/^\/api\/v1\/songs\/link\/\?video=.*/).respond(
        404, {'link': null}
      );
    });
    browser.get('http://localhost:8000');
    var directives = element.all(by.repeater('song in songs'));
    var directive = directives.first();
    var firstDirectiveInput = directive.element(by.model('songSearch'));
    firstDirectiveInput.sendKeys('Null');
    var downloadButton = directive.element(by.css('.btn-download'));
    downloadButton.click();
    var linkVideoSuggested = directive.element(by.css('.error-link'));
    expect(linkVideoSuggested.isDisplayed()).toBeFalsy();
  });

  it('should change iframe source on single download', function() {

  });

  it('should change all the iframe sources on download all', function() {

  });

});
