 'use strict';

/**
 * @ngdoc service
 * @name clientApp.nativeInterface
 * @description
 * # nativeInterface
 * Service in the clientApp.
 */
angular.module('angular-anvil')
  .service('nativeInterface', ['$location', '$window', '$timeout', function nativeInterface($location, $window, $timeout) {
      
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
            },
            requestEnviroment : function() {
                actions.ios._launch('anvil://requestEnviroment');  
            }

         },
         androidTimer : 250,
         'android' : {
             setTitle : function(title) {
                if (window.anvilInterface && window.anvilInterface.setTitle) {
                    window.anvilInterface.setTitle(title);
                } else {
                    $timeout(function() {
                        actions.android.setTitle(title);
                    },action.androidTimer);
                }
             },
             showTab : function(tabName) {
                if (window.anvilInterface && window.anvilInterface.showTab) {
                    window.anvilInterface.showTab(tabName);
                } else {
                    $timeout(function() {
                        actions.android.showTab(tabName);
                    },action.androidTimer);
                }
             },
             showBackButton : function(label) {
                if (window.anvilInterface && window.anvilInterface.showBackButton) {
                    window.anvilInterface.showBackButton(label);
                } else {
                    $timeout(function() {
                        actions.android.showBackButton(label);
                    },action.androidTimer);
                }
             },
             hideBackButton : function() {
                if (window.anvilInterface && window.anvilInterface.hideBackButton) {
                    window.anvilInterface.hideBackButton();
                } else {
                    $timeout(function() {
                        actions.android.hideBackButton();
                    },action.androidTimer);
                }
             },
             deliverMessage : function(tabName, msg) {
                if (window.anvilInterface && window.anvilInterface.deliverMessage) {
                    window.anvilInterface.deliverMessage(tabName, prepareMessage(msg));
                } else {
                    $timeout(function() {
                        actions.android.deliverMessage(tabName, msg);
                    },action.androidTimer);
                }
             },
             hideLoading : function() {
                if (window.anvilInterface && window.anvilInterface.hideLoading) {
                    window.anvilInterface.hideLoading(); 
                }
             },
             showLoading : function(label) {
                if (window.anvilInterface && window.anvilInterface.showLoading) {
                    window.anvilInterface.showLoading(label); 
                }
             },
             openInBrowser : function(url) {
                if (window.anvilInterface && window.anvilInterface.openInBrowser) {
                    window.anvilInterface.openInBrowser(url);
                }
            },
            setLanguage : function(lang) {
                if (window.anvilInterface && window.anvilInterface.setLanguage) {
                    window.anvilInterface.setLanguage(lang);
                }
            },
            requestEnviroment : function() {
                if (window.anvilInterface && window.anvilInterface.requestEnviroment) {
                    window.anvilInterface.requestEnviroment();
                }
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
             },
             requestEnviroment : function() {
                window.external.notify('requestEnviroment');
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
             },
             requestEnviroment : function(lang) {
                 window.parent.postMessage('requestEnviroment', '*');
             },

         }
      };

      return actions[currentArch] || {};
  }]);
