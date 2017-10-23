'use strict';
module.exports = function(angular) {

  angular
    .module('angular-anvil')
    .factory('nativeInterface', nativeInterface);

  /** @ngInject */
  function nativeInterface($window, nativeInterfaceAnvil, nativeInterfaceIos, nativeInterfaceAndroid) {


    if ($window.ionic.Platform.isIOS()) {

      return nativeInterfaceIos;

    } else if (ionic.Platform.isAndroid()) {

      return nativeInterfaceAndroid;

    } else {

      return nativeInterfaceAnvil;

    }

  }

};
