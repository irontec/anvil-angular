'use strict';

/**
 * @ngdoc service
 * @name clientApp.masterhub
 * @description
 * # masterhub
 * Service in the clientApp.
 */
angular.module('angular-anvil')
  .service('masterhub', ['$location','$window', function masterhub($location, $window) { 
          
    // AngularJS will instantiate a singleton by calling "new" on this function
    var _ = $window._;
    var ionic = $window.ionic;
    var actions = ['init','resume','beforeShow','afterShow','backButton','menuButton'];

    $window.device = $window.device || {};
    
    if (!ionic.Platform.isWebView()) {
        window.addEventListener('message', function(e) {
            var destination = e.data.split(':')[0];
            if (destination !== 'master') {
                return;
            }
            
            var command = e.data.split(':')[1];
            var argument = e.data.split(':')[2] || undefined;
            if (_.indexOf(actions, command) === -1) {
                return;
            }

            if (command === 'init') {
                // Init puede traer una estructura (en principio con lang), perfectamente formateada desde origen.
                try {
                    argument = angular.fromJson(decodeURIComponent(argument));
                } catch(e) {
                    argument = null;
                }
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
            if (_.indexOf(actions, actionName) !== -1) {
                $window.device[actionName] = fn;
            }
        }
    };
    
  }]);
