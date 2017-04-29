import 'angular';
import 'angular-mocks/angular-mocks';

var testContext = require.context(".", true, /.test$/);
testContext.keys().forEach(testContext);
