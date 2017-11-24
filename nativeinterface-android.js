(function() {
  'use strict';

  angular
    .module('angular-anvil')
    .factory('nativeInterfaceAndroid', nativeInterfaceAndroid);

  /** @ngInject */
  function nativeInterfaceAndroid($window, $timeout, $log) {

    var androidInterfaceName = 'anvilInterface';
    $window.anvilInterface = $window.anvilInterface || {};

    var service = {
        setTitle: send('setTitle'),
        showLoading: send('showLoading'),
        hideLoading: send('hideLoading'),
        openInBrowser: send('openInBrowser'),
        openExternalApp: send('openExternalApp'),
        setWidgetConfiguration: send('setWidgetConfiguration'),
        setReauthConfiguration: send('setReauthConfiguration'),
        setLanguage: send('setLanguage'),
        requestEnviroment: send('requestEnviroment'),
        showMenu: send('showMenu'),
        hideMenu: send('hideMenu'),
        showHeader: send('showHeader'),
        hideHeader: send('hideHeader'),
        showMenuSection: send('showMenuSection'),
        hideMenuSection: send('hideMenuSection'),
        showMenuItem: send('showMenuItem'),
        hideMenuItem: send('hideMenuItem'),
        showBadgeForItem: send('showBadgeForItem'),
        hideBadgeForItem: send('hideBadgeForItem'),
        setSectionBackgroundColor: send('setSectionBackgroundColor'),
        setSectionSelectedBackgroundColor: send('setSectionSelectedBackgroundColor'),
        setFooterBackgroundColor: send('setFooterBackgroundColor'),
        setSectionBold: send('setSectionBold'),
        setMenuItemSelected: send('setMenuItemSelected'),
        showMenuHeader: send('showMenuHeader'),
        hideMenuHeader: send('hideMenuHeader'),
        showHeaderLeftButton: send('showHeaderLeftButton'),
        hideHeaderLeftButton: send('hideHeaderLeftButton'),
        showHeaderRightButton: send('showHeaderRightButton'),
        hideHeaderRightButton: send('hideHeaderRightButton'),
        goBackground: send('goBackground')
    };


    return service;



    function send(methodName, recheck) {
        return function (){
            if (angular.isDefined($window[androidInterfaceName]) &&
                    angular.isFunction($window[androidInterfaceName][methodName])) {
                $window[androidInterfaceName][methodName].apply($window[androidInterfaceName], arguments);
            } else {
                // Le damos una segunda oportunidad de 400ms para que android "escriba su interfaz"
                if (!angular.isDefined(recheck)) {
                    $timeout(function() {
                        // Invocamos send con recheck a true para evitar que se vuelva a encolar
                        send(methodName, true).apply(service, arguments);
                    },400);
                } else {
                    throw 'interfaz no presente en android: ' + methodName, arguments;
                }
            }
        }
    }





  }

})();
