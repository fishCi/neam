package com.ccb.neam.module;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.modules.core.DeviceEventManagerModule;

/**
 * Created by niesha.zh on 2017/10/14.
 *
 * 本模块功能用于提供一个通用的js调用接口
 */
public class JsCallModule extends ReactContextBaseJavaModule {

    protected static ReactApplicationContext reactContext;

    public JsCallModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    //ReactContextBaseJavaModule要求派生类实现getName方法。这个函数用于返回一个字符串名字，这个名字在JavaScript端标记这个模块。这里我们把这个模块叫做Toast1，这样就可以在JavaScript中通过React.NativeModules.Toast1访问到这个模块。
    @Override
    public String getName() {
        return "JsCallModule";
    }

    public static void callJsAsync(String eventName, String param)
    {
        JsCallModule.reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, param);
    }

    public static void onNetConnected() {
        callJsAsync("onNetConnected", "");
    }

    public static void onNetConnecting(boolean isConnecting) {
        callJsAsync("onNetConnecting", String.valueOf(isConnecting));
    }

    public static void onNetError(int errorCode) {
        callJsAsync("onNetError", String.valueOf(errorCode));
    }

    public static void onLoginError(int errorCode) {
        callJsAsync("onLoginError", String.valueOf(errorCode));
    }

}
