package com.ccb.neam;

import android.os.Bundle;

import com.ccb.neam.utils.AnyOfficeUtil;
import com.ccb.neam.utils.HandlerUtils;
import com.ccb.neam.utils.LogUtils;
import com.facebook.react.ReactActivity;
import com.huawei.anyoffice.sdk.sandbox.SDKScreenShot;

public class MainActivity extends ReactActivity {

	private static MainActivity instance;

    public static MainActivity getInstance() {
        return instance;
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "neam";
    }
	
	@Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //SDKScreenShot.disableScreenShot(this);
        instance = this;

        LogUtils.init(this);
        HandlerUtils.setContext(this);

//        new Thread(new Runnable() {
 //           public void run() {
        AnyOfficeUtil.getInstance().initAnyOffice(MainActivity.getInstance());
  //          }
   //     }).start();

    }
}
