# anvil-angular

Angular services for anvil enviroment.

v0.0.* > Anvil

v0.1.0 > Anvil²



## Usage
```javascript
 angular
    .module('yourapp', ['angular-anvil'])
    .run(function runBlock(
        $log, $state, $rootScope,
        hub, nativeInterface
    ) {

    hub.on('init', function(env) {
        $rootScope.$broadcast('hub:init', env);
        nativeInterface.showMenuHeader();
    });

```


### Available method from native >> JS (hub)
* init(env)
* resume(env)
* notifiyEnviroment(env)
* menuHeaderAction(env)
* menuItemAction(env)
* menuOpened(env)
* menuClosed(env)
* headerLeftButtonAction(env)
* headerRightButtonAction(env)
* showPushNotification(env)

### Available method JS >> native (nativeInterface)
* setTitle
* showLoading
* hideLoading
* openInBrowser
* openExternalApp
* setReauthConfiguration
* setWidgetConfiguration
* setLanguage
* requestEnviroment
* showMenu
* hideMenu
* showHeader
* hideHeader
* showMenuSection
* hideMenuSection
* showMenuItem
* hideMenuItem
* showMenuHeader
* hideMenuHeader
* showHeaderLeftButton
* hideHeaderLeftButton
* showHeaderRightButton
* hideHeaderRightButton
