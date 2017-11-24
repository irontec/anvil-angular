(function() {
  'use strict';

  angular
    .module('angular-anvil')
    .factory('nativeInterfaceIos', nativeInterfaceIos);

  /** @ngInject */
  function nativeInterfaceIos($http) {


    var service = {
        setTitle: send('setTitle','title'),
        showLoading: send('showLoading','label'),
        hideLoading: send('hideLoading'),
        openInBrowser: send('openInBrowser','url'),
        openExternalApp: send('openExternalApp', 'iosUrl', 'iosScheme'),
        setWidgetConfiguration: send('setWidgetConfiguration', 'widgetConfiguration'),
        setReauthConfiguration: send('setReauthConfiguration', 'reauthConfiguration'),
        setLanguage: send('setLanguage','language'),
        requestEnviroment: send('requestEnviroment'),
        showMenu: send('showMenu'),
        hideMenu: send('hideMenu'),
        showHeader: send('showHeader'),
        hideHeader: send('hideHeader'),
        showMenuSection: send('showMenuSection','identifier'),
        hideMenuSection: send('hideMenuSection','identifier'),
        showMenuItem: send('showMenuItem','identifier'),
        hideMenuItem: send('hideMenuItem','identifier'),
        showBadgeForItem: send('showBadgeForItem','identifier','badge'),
        hideBadgeForItem: send('hideBadgeForItem','identifier'),
        setSectionBackgroundColor: send('setSectionBackgroundColor','identifier','color'),
        setSectionSelectedBackgroundColor: send('setSectionSelectedBackgroundColor','identifier','color'),
        setFooterBackgroundColor: send('setFooterBackgroundColor','color'),
        setSectionBold: send('setSectionBold','identifier','bold'),
        setMenuItemSelected: send('setMenuItemSelected','identifier'),
        showMenuHeader: send('showMenuHeader','name','email'),
        hideMenuHeader: send('hideMenuHeader'),
        showHeaderLeftButton: send('showHeaderLeftButton','type'),
        hideHeaderLeftButton: send('hideHeaderLeftButton'),
        showHeaderRightButton: send('showHeaderRightButton','type'),
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

    function _launchIframe(url)  {
        console.log("going to ", url);
        var iframe = document.createElement('iframe');
        iframe.setAttribute('width','1px');
        iframe.setAttribute('height','1px');
        iframe.setAttribute('src', url);
        document.documentElement.appendChild(iframe);
        setTimeout(function() {
            iframe.parentNode.removeChild(iframe);
            iframe = null;
        }, 1500);
    }

    function send(methodName, arg1name, arg2name) {

        return function(arg1, arg2) {

            var args = [];
            var dictionary = {};
            if (angular.isDefined(arg1)) {
                args.push(arg1name + '=' + _toString(arg1));
                dictionary[arg1name] = arg1;
            }
            if (angular.isDefined(arg2)) {
                args.push(arg2name + '=' + _toString(arg2));
                dictionary[arg2name] = arg2;
            }

            if (window.webkit && window.webkit.messageHandlers) {
                window.webkit.messageHandlers[methodName].postMessage(dictionary);
            } else {
                _launchIframe('anvil://' + methodName + '?' + args.join('&'));
            }

        }

    }




  }

})();
