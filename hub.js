hub.$inject = ["$window", "$timeout", "$log"];

function hub($window, $timeout, $log) {
    const methods = [
        "init",
        "resume",
        "notifiyEnviroment",
        "menuHeaderAction",
        "menuItemAction",
        "menuOpened",
        "menuClosed",
        "backButton",
        "headerLeftButtonAction",
        "headerRightButtonAction",
        "showPushNotification"
    ];

    /**
     * Si estamos en una navegador, nos ponemos  la escucha de mensajes (anvil)
     */
    if (!$window.ionic.Platform.isWebView()) {
        registerListeners();
    }

    if (!angular.isObject($window.device)) {
        $window.device = {};
    }

    const service = {
        on: registerFunction
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
    function registerListeners() {

        $window.addEventListener("message", function (e) {
            const str = e.data;
            // webpack injects messages over here? (as objects 🚀)
            if (typeof str !== 'string') {
                return;
            }

            // webpack injects messages over here? (as string 🚀)
            const fragments = str.split(":");
            if (fragments.length !== 2) {
                return;
            }


            const [action, payload] = fragments;

            if (
                methods.indexOf(action) === -1 ||
                !angular.isFunction(window.device[action])
            ) {
                return;
            }


            const args = payload.split("|") || [];

            for (let i = 0; i < args.length; i++) {
                try {
                    args[i] = angular.fromJson(decodeURIComponent(args[i]));
                } catch (exception) {
                    args[i] = decodeURIComponent(args[i]);
                }
            }

            $timeout(function () {
                $window.device[action].apply($window.device[action], args);
            }, 0);
        });
    }
}

export default hub;