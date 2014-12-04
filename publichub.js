'use strict';

/**
 * @ngdoc service
 * @name clientApp.publichub.js
 * @description
 * # publichub.js
 * Service in the clientApp.
 */
angular.module('angular-anvil')
  .service('publichub', ['$window', function publichub($window) { 

      var publicActions = [
        'injectMessage',
        'beforeShow',
        'afterShow',
        'backButton'
      ];
      var ionic = $window.ionic;
      var _ = $window._;
    
      $window.device = $window.device || {};

      if (!ionic.Platform.isWebView()) {
          window.addEventListener('message', function(e) {
              var destination = e.data.split(':')[0];
              if (destination !== 'public') {
                return;
              }
              var command = e.data.split(':')[1];
              var argument = e.data.split(':')[2] || undefined;
              if (_.indexOf(publicActions, command) === -1) {
                  return;
              }
              
              if (command === 'injectMessage') {
                argument = decodeURIComponent(argument);
              }
              
              $window.device[command](argument);
              return;
              
          }, false);
      }

      if (ionic.Platform.isWindowsPhone()) {
        $window.deviceWP = function() {
          if ($window.device[arguments[0]]) {
              var fn = $window.device[arguments[0]];
              fn.apply(fn, [].splice.call(arguments,1));
          }
        };
      }
      
      return {
          registerAction : function(actionName, fn) {
              if (_.indexOf(publicActions, actionName) !== -1) {
                  $window.device[actionName] = fn;

              }
          }
      };
      
  }]);
