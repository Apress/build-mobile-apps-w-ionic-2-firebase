import 'core-js/es6';
import 'core-js/es7/reflect';

import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';

declare var __karma__: any;
declare var require: any;

__karma__.loaded = function (): any { };

Promise.all([
  System.import('@angular/core/testing'),
  System.import('@angular/platform-browser-dynamic/testing'),
])
  .then(([testing, testingBrowser]) => {
    testing.getTestBed().initTestEnvironment(
      testingBrowser.BrowserDynamicTestingModule,
      testingBrowser.platformBrowserDynamicTesting()
    );
  })
  .then(() => require.context('./', true, /\.spec\.ts/))
  .then(context => context.keys().map(context))
  .then(__karma__.start, __karma__.error);
