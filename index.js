import nativeInterface from "./nativeinterface";
import nativeInterfaceAndroid from "./nativeinterface-android";
import nativeInterfaceAnvil from "./nativeinterface-anvil";
import nativeInterfaceIos from "./nativeinterface-ios";
import hub from "./hub";

export default angular
    .module("angular-anvil", [])
    .factory("nativeInterfaceAndroid", nativeInterfaceAndroid)
    .factory("nativeInterfaceAnvil", nativeInterfaceAnvil)
    .factory("nativeInterfaceIos", nativeInterfaceIos)
    .factory("nativeInterface", nativeInterface)
    .factory("hub", hub);