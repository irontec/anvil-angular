'use strict';

/**
 * @ngdoc service
 * @name clientApp.messageDispatcher
 * @description
 * # messageDispatcher
 * Service in the clientApp.
 */
angular.module('angular-anvil')
    .service('messageDispatcher', ['publichub',
        function messageDispatcher(publichub) {

            var actions = {};

            publichub.registerAction('injectMessage', function(data) {
                data = angular.fromJson(decodeURIComponent(data));

                if (!data.action) {
                    throw 'Invalid data object received on messageDispatcher';
                }

                if (!angular.isFunction(actions[data.action])) {
                    throw 'Received action not register. Nothing to do on messageDispatcher';
                }


                actions[data.action](data);

            });

            return {
                on: function(actionName, fn) {
                    actions[actionName] = fn;
                    return this;
                },
                trigger: function(actionName, data) {
                    if (!angular.isFunction(actions[actionName])) {
                        throw 'triggered action not found. Nothing to do on messageDispatcher';
                    }
                    actions[actionName](data);
                }
            };

        }
    ]);