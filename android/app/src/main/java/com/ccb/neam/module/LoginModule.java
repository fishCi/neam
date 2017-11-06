package com.ccb.neam.module;

import com.ccb.neam.MainActivity;
import com.ccb.neam.utils.AnyOfficeUtil;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;


/**
 * Created by niesha.zh on 2017/10/13.
 */

public class LoginModule extends ReactContextBaseJavaModule {

    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";

    protected ReactApplicationContext reactContext;

    public LoginModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    //ReactContextBaseJavaModule要求派生类实现getName方法。这个函数用于返回一个字符串名字，这个名字在JavaScript端标记这个模块。这里我们把这个模块叫做Toast1，这样就可以在JavaScript中通过React.NativeModules.Toast1访问到这个模块。
    @Override
    public String getName() {
        return "AnyOfficeLogin";
    }

    //一个可选的方法getContants返回了需要导出给JavaScript使用的常量。它并不一定需要实现，但在定义一些可以被JavaScript同步访问到的预定义的值时非常有用。
//    @Override
//    public Map<String, Object> getConstants() {
//        final Map<String, Object> constants = MapBuilder.newHashMap();
//        constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
//        constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
//        return constants;
//    }

    @ReactMethod
    public void login(final String username, final String password, Callback successCallback, Callback errorCallback) {
//        ToastUtils.showToast(MainActivity.getInstance(), "login:" + username + "/" + password);
        int rs = AnyOfficeUtil.getInstance().startLogin(MainActivity.getInstance(), username, password);

        if (rs == 0) {
            successCallback.invoke();
        } else {
            errorCallback.invoke(rs);
        }

//        int count = 0;
//        for (;count<5;count++) {
//            try {
//                Thread.sleep(2000l);
//            } catch (InterruptedException e) {
//                e.printStackTrace();
//            }
//            JsCallModule.callJsAsync("testEvent", "this is " + count + TimeUtils.getCurrentStamp());
//       }
    }

    @ReactMethod
    public void setHostAndPort(String host, int port) {
        AnyOfficeUtil.getInstance().setHostAndPort(host, port);
    }

    @ReactMethod
    public void setWhiteList(String whiteList) {
        AnyOfficeUtil.getInstance().setWhitelist(whiteList);
    }
}
