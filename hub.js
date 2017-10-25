(function() {
  'use strict';

  angular
    .module('angular-anvil')
    .factory('hub', hub);

  /** @ngInject */
  function hub($window, $timeout) {

    var methods = ['init', 'resume', 'notifiyEnviroment', 'menuHeaderAction', 'menuItemAction', 'menuOpened', 'menuClosed',
                   'backButton', 'headerLeftButtonAction', 'headerRightButtonAction', 'showPushNotification', 'getAuthCodes'];

    /**
     * Si estamos en una navegador, nos ponemos  la escucha de mensajes (anvil)
     */
    if (!$window.ionic.Platform.isWebView()) {
      registerListener(methods);
    }


    if (!angular.isObject($window.device)) {
        $window.device = {};
    }


    var service = {
        on : registerFunction
    };

    return service;

    function registerFunction(functionName, callback) {
        if (methods.indexOf(functionName) === -1) {
            $log.error("Registering invalid method on masterHub");
            return;
        }

        $window.device[functionName] = callback;
    }


    /**
     * Escuchador para plataforma anvil.
     * No se ejecutará en modo nativo
     */
    function registerListener(methods) {
      $window.addEventListener('message', function(e) {

          var action = e.data.split(':')[0];

          if ( (methods.indexOf(action) === -1) ||
              (!angular.isFunction($window.device[action])) ) {
              return;
          }


          var args = e.data.split(':')[1] || '';

          args = args.split('|') || [];


          for(var i=0; i<args.length; i++) {
            try {
              args[i] = angular.fromJson(decodeURIComponent(args[i]));
            } catch (e) {
              args[i] = decodeURIComponent(args[i]);
            }
          }

          $timeout(function() {
            $window.device[action].apply($window.device[action], args);
          },0);

      });
    }

  }

})();


