function MockBackendE2E(browser) {
  this._browser = browser;
  this._commonMockFunction = 'function(backend) {}';
}

MockBackendE2E.prototype.commonMock = function (commonMockFunction) {
  this._commonMockFunction = commonMockFunction;
}

MockBackendE2E.prototype.mock = function (mockFunction) {
  mockFunction = mockFunction || 'function(backend) {}';
  this._browser.addMockModule(
    'mockBackendModuleE2E',
    function() {
      eval(arguments[0]);
      eval(arguments[1]);
      angular.module('mockBackendModuleE2E', ['ngMockE2E'])
      .run(function($httpBackend) {
        commonMockFunctionJS($httpBackend);
        mockFunctionJS($httpBackend);
      })
    },
    'var commonMockFunctionJS = ' + this._commonMockFunction,
    'var mockFunctionJS = ' + mockFunction
  );
}

MockBackendE2E.prototype.clear = function (timeout) {
  if (this._browser) {
    this._browser.removeMockModule('mockBackendModuleE2E');
  }
}

module.exports = MockBackendE2E;
