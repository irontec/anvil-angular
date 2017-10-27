nativeInterface.$inject = ["$window", "nativeInterfaceAnvil", "nativeInterfaceIos", "nativeInterfaceAndroid"];

function nativeInterface($window, nativeInterfaceAnvil, nativeInterfaceIos, nativeInterfaceAndroid) {
    if ($window.ionic.Platform.isIOS()) {

        return nativeInterfaceIos;

    } else if ($window.ionic.Platform.isAndroid()) {

        return nativeInterfaceAndroid;

    } else {

        return nativeInterfaceAnvil;

    }

}

export default nativeInterface;