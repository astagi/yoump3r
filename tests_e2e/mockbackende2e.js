function MockBackendE2E(browser) {
  this._browser = browser;
  this._mockFunctions = [];
  this.clear();
}

MockBackendE2E.prototype.mock = function (mockFunction) {
  if (mockFunction) {
    this._mockFunctions.push(mockFunction);
  }
  this.clear();
  this._browser.addMockModule(
    'mockBackendModuleE2E',
    function() {
      eval(arguments[0]);
      angular.module('mockBackendModuleE2E', ['ngMockE2E'])
      .run(function($httpBackend) {
        for (var i = 0 ; mockFunctionsJS.length ; i++) {
          mockFunctionsJS[i]($httpBackend);
        }
      })
    },
    'var mockFunctionsJS = ' + this._mockFunctions
  );
}

MockBackendE2E.prototype.clear = function (timeout) {
  if (this._browser) {
    this._browser.removeMockModule('mockBackendModuleE2E');
  }
}

module.exports = MockBackendE2E;
