 'use strict';

/**
 * @ngdoc service
 * @name clientApp.nativeInterface
 * @description
 * # nativeInterface
 * Service in the clientApp.
 */
angular.module('angular-anvil')
  .service('nativeInterface', ['$location', '$window', function nativeInterface($location, $window) {
      
    var currentArch = $location.search().arch || 'anvil'; 
    var ionic = $window.ionic;

    if (ionic.Platform.isIOS()) {
        currentArch = 'ios';
    } else if (ionic.Platform.isAndroid()) {
        currentArch = 'android';
    } else if (ionic.Platform.isWindowsPhone()) {
        currentArch = 'windowsphone';
    }
      
      
      var encodeParam = function(param) {
          return encodeURIComponent(param).
                    replace(/['()]/g, $window.escape).
                        replace(/\*/g, '%2A').
                            replace(/%(?:7C|60|5E)/g, $window.unescape);

      };
      
      var prepareMessage = function(msg) {
        return encodeParam(angular.toJson(msg, false));
      };
      
      // Public API here
      var actions = {
         'ios' : {
             _launch : function(_url) {
                 var iframe = document.createElement('iframe');
                 iframe.setAttribute('width','1px');
                 iframe.setAttribute('height','1px');
                 iframe.setAttribute('src', _url);
                 document.documentElement.appendChild(iframe);
                 setTimeout(function() {
                     iframe.parentNode.removeChild(iframe);
                     iframe = null;
                 }, 1500);
             },
            setTitle : function(title) {
                actions.ios._launch('anvil://setTitle?title=' + encodeParam(title));
            },
            showTab : function(tabName) {
                actions.ios._launch('anvil://showTab?tabName=' + encodeParam(tabName));
            },
            showBackButton : function(label) {
                actions.ios._launch('anvil://showBackButton?label=' + encodeParam(label));
            },
            hideBackButton : function() {
                actions.ios._launch('anvil://hideBackButton');
            },
            deliverMessage : function(tabName, msg) {
                actions.ios._launch('anvil://deliverMessage?tabDestination=' + encodeParam(tabName) + '&msg=' + prepareMessage(msg));
            },
            hideLoading : function() {
                actions.ios._launch('anvil://hideLoading');
            },
            showLoading : function(label) {
                actions.ios._launch('anvil://showLoading?label=' + encodeParam(label));
            },
            openInBrowser : function(url) {
                actions.ios._launch('anvil://openInBrowser?url=' + encodeParam(url));
            },
            setLanguage : function(lang) {
                actions.ios._launch('anvil://setLanguage?lang=' + encodeParam(lang));  
            }

         },
         'android' : {
             setTitle : function(title) {
                 window.anvilInterface.setTitle(title);
             },
             showTab : function(tabName) {
                 window.anvilInterface.showTab(tabName);
             },
             showBackButton : function(label) {
                 window.anvilInterface.showBackButton(label);
             },
             hideBackButton : function() {
                 window.anvilInterface.hideBackButton();
             },
             deliverMessage : function(tabName, msg) {
console.log("DELIVERING MESAGE", prepareMessage(msg));
                 window.anvilInterface.deliverMessage(tabName, prepareMessage(msg));
             },
             hideLoading : function() {
                 window.anvilInterface.hideLoading(); 
             },
             showLoading : function(label) {
                 window.anvilInterface.showLoading(label); 
             },
             openInBrowser : function(url) {
                window.anvilInterface.openInBrowser(url);                
            },
            setLanguage : function(lang) {
                window.anvilInterface.setLanguage(lang);
            }
         },
         'windowsphone' : {
             setTitle : function(title) {
                 window.external.notify('setTitle;'+ encodeParam(title)); 
             },
             showTab : function(tabName) {
                 window.external.notify('showTab;'+ encodeParam(tabName));
             },
             showBackButton : function(label) {
                 window.external.notify('showBackButton;' + encodeParam(label));
             },
             hideBackButton : function() {
                 window.external.notify('hideBackButton');
             },
             deliverMessage : function(tabName, msg) {
                 window.external.notify('deliverMessage;' + encodeParam(tabName) + ';' +prepareMessage(msg));
             },
             hideLoading : function() {
                 window.external.notify('hideLoading'); 
             },
             showLoading : function(label) {
                 window.external.notify('showLoading;' + encodeParam(label)); 
             },
             openInBrowser : function(url) {
                 window.external.notify('openInBrowser;' + encodeParam(url)); 
             },
             setLanguage : function(lang) {
                 window.external.notify('setLanguage;' + lang); 
             }
         },
         'anvil' : {
             setTitle : function(title) {
                 window.parent.postMessage('setTitle:'+ encodeParam(title), '*');
             },
             showTab : function(tabName) {
                 window.parent.postMessage('showTab:' + tabName, '*');
             },
             showBackButton : function(label) {
                 window.parent.postMessage('showBackButton:' + label, '*');
             },
             hideBackButton : function() {
                 window.parent.postMessage('hideBackButton', '*');
             },
             deliverMessage : function(tabName, msg) {
                 window.parent.postMessage('deliverMessage:' + encodeParam(tabName) + '|' + prepareMessage(msg), '*');
             },
             hideLoading : function() {
                 window.parent.postMessage('hideLoading', '*'); 
             },
             showLoading : function(label) {
                 label = label || 'Cargando';
                 window.parent.postMessage('showLoading:' + encodeParam(label), '*'); 
             },
             openInBrowser : function(url) {
                window.open(url);
             },
             setLanguage : function(lang) {
                 window.parent.postMessage('setLanguage:' + encodeParam(lang), '*');
             }
         }
      };

      return actions[currentArch] || {};
  }]);
