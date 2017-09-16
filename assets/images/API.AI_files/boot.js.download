// this is the entry point and it is not hashboosted so
// 0. DO NOT CHANGE IT
// 1. RENAME it each time you actually change it
// 2. keep it as small as possible, all initializations should be done in the
// app module, not there
(function (window) {
  'use strict';
  jQuery(document).ready(function () {
    jQuery.get('/api-client/config.json').then(function (data) {
      window.angular
        .module('api.preloadServerConfig', [])
        .constant('preloadServerConfig', data);
      window.angular.bootstrap(document.body, ['apiApp']);
    });
  });
})(window);