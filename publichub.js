'use strict';

/**
 * @ngdoc service
 * @name clientApp.publichub.js
 * @description
 * # publichub.js
 * Service in the clientApp.
 */
angular.module('angular-anvil')
    .service('publichub', ['$window',
        function publichub($window) {

            var actions = {
                methods: [
                    'injectMessage',
                    'beforeShow',
                    'afterShow',
                    'backButton'
                ],
                exists: function(methodName) {
                    return actions.methods.indexOf(methodName) !== -1;
                },
                isCallable: function(methodName) {
                    return this.exists(methodName) && angular.isFunction($window.device[methodName]);
                }
            };

            var ionic = $window.ionic;

            $window.device = $window.device || {};

            if (!ionic.Platform.isWebView()) {
                window.addEventListener('message', function(e) {
                    var destination = e.data.split(':')[0];
                    if (destination !== 'public') {
                        return;
                    }
                    var command = e.data.split(':')[1];
                    var argument = e.data.split(':')[2] || undefined;

                    if (!actions.exists(command)) {
                        return;
                    }

                    if (command === 'injectMessage') {
                        argument = decodeURIComponent(argument);
                    }


                    if (actions.isCallable(command)) {
                        $window.device[command](argument);
                    }

                }, false);
            }

            if (ionic.Platform.isWindowsPhone()) {
                $window.deviceWP = function() {
                    if ($window.device[arguments[0]]) {
                        var fn = $window.device[arguments[0]];
                        fn.apply(fn, [].splice.call(arguments, 1));
                    }
                };
            }

            return {
                registerAction: function(actionName, fn) {
                    if (actions.exists(actionName)) {
                        $window.device[actionName] = fn;
                    }
                }
            };

        }
    ]);