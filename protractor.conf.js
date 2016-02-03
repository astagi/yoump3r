exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: [
    'tests_e2e/**/*.js'
  ],

  multiCapabilities: [ {
    browserName: 'chrome',
    version: '',
    platform: 'ANY'
  }, {
    browserName: 'firefox',
    version: '',
    platform: 'ANY'
  }]

};