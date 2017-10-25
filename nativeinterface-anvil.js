(function() {
  'use strict';

  angular
    .module('angular-anvil')
    .factory('nativeInterfaceAnvil', nativeInterfaceAnvil);

  /** @ngInject */
  function nativeInterfaceAnvil($window) {

    var service = {
        setTitle: send('setTitle'),
        showLoading: send('showLoading'),
        hideLoading: send('hideLoading'),
        openInBrowser: send('openInBrowser'),
        openExternalApp: send('openExternalApp'),
        setWidgetConfiguration: send('setWidgetConfiguration'),
        setAuthCodes: send('setAuthCodes', 'AuthCodes'),
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
        hideHeaderRightButton: send('hideHeaderRightButton')
    };

    return service;



    function _toString(data) {
        if (angular.isDefined(data) && data !== null) {
            if (angular.isObject(data)) {
                return encodeURIComponent(angular.toJson(data));
            }
            return encodeURIComponent(data.toString());
        }

        return null;
    }



    function send(methodName) {
        return function(data) {
            var args = [];
            for(var i=0;i<arguments.length;i++) {
                args.push(_toString(arguments[i]));
            }
            $window.parent.postMessage(methodName + ':' +  args.join('|'),'*');
        }
    }
  }

})();
