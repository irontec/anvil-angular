nativeInterfaceAnvil.$inject = ["$window"];

function nativeInterfaceAnvil($window) {

    const service = {
        setTitle: send("setTitle"),
        showLoading: send("showLoading"),
        hideLoading: send("hideLoading"),
        openInBrowser: send("openInBrowser"),
        openExternalApp: send("openExternalApp"),
        setWidgetConfiguration: send("setWidgetConfiguration"),
        setAuthCodes: send("setAuthCodes", "AuthCodes"),
        setLanguage: send("setLanguage"),
        requestEnviroment: send("requestEnviroment"),
        showMenu: send("showMenu"),
        hideMenu: send("hideMenu"),
        showHeader: send("showHeader"),
        hideHeader: send("hideHeader"),
        showMenuSection: send("showMenuSection"),
        hideMenuSection: send("hideMenuSection"),
        showMenuItem: send("showMenuItem"),
        hideMenuItem: send("hideMenuItem"),
        showBadgeForItem: send("showBadgeForItem"),
        hideBadgeForItem: send("hideBadgeForItem"),
        setSectionBackgroundColor: send("setSectionBackgroundColor"),
        setSectionSelectedBackgroundColor: send("setSectionSelectedBackgroundColor"),
        setFooterBackgroundColor: send("setFooterBackgroundColor"),
        setSectionBold: send("setSectionBold"),
        setMenuItemSelected: send("setMenuItemSelected"),
        showMenuHeader: send("showMenuHeader"),
        hideMenuHeader: send("hideMenuHeader"),
        showHeaderLeftButton: send("showHeaderLeftButton"),
        hideHeaderLeftButton: send("hideHeaderLeftButton"),
        showHeaderRightButton: send("showHeaderRightButton"),
        hideHeaderRightButton: send("hideHeaderRightButton")
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
        return function () {
            let args = [];
            for (let i = 0; i < arguments.length; i++) {
                args.push(_toString(arguments[i]));
            }
            $window.parent.postMessage(methodName + ":" + args.join("|"), "*");
        };
    }
}

export default nativeInterfaceAnvil;