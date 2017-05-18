const SpecReporter = require('jasmine-spec-reporter');
const Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  allScriptsTimeout: 15000,
  useAllAngular2AppRoots: true,
  suites: {
    top_stories: './e2e/top_stories.e2e_spec.ts',
    user: './e2e/user.e2e_spec.ts',
    favorites: './e2e/favorites.e2e_spec.ts',
  },
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: true,
  baseUrl: 'http://localhost:9100/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    showTiming: true,
    defaultTimeoutInterval: 30000, 
  },
  beforeLaunch: function() {
    require('ts-node').register({
      project: 'e2e'
    });
  },
  onPrepare: function() {
    jasmine.getEnv().addReporter(new SpecReporter());
    jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
      savePath: './_test-output/e2e',
    }));
    browser.ignoreSynchronization = true;
  }
};