package com.ccb.neam;

import android.app.Activity;
import android.app.Application;
import android.os.Bundle;

import com.ccb.neam.module.AppReactPackage;
import com.ccb.neam.utils.AnyOfficeUtil;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.github.wuxudong.rncharts.MPAndroidChartPackage;
import com.oblador.vectoricons.VectorIconsPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new MPAndroidChartPackage(),
            new VectorIconsPackage(),
              new AppReactPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  protected int activityCount = 0;
  protected boolean inited = false; 
  
  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
	
	registerActivityLifecycleCallbacks(new ActivityLifecycleCallbacks() {
            @Override
            public void onActivityCreated(Activity activity, Bundle savedInstanceState) {

//                DefaultLogger.getInstance().info("onActivityCreated");
            }

            @Override
            public void onActivityStarted(Activity activity) {
                if (activityCount == 0) {
                    if (inited) {
                        //app back to front
//                        DefaultLogger.getInstance().info("backToFront");
                        AnyOfficeUtil.getInstance().onResume();
                    } else {
                        inited = true;
                    }
                }
                activityCount++;

//                DefaultLogger.getInstance().info("onActivityStarted");
            }

            @Override
            public void onActivityResumed(Activity activity) {
//                DefaultLogger.getInstance().info("onActivityResumed");

            }

            @Override
            public void onActivityPaused(Activity activity) {
                activityCount--;
//                DefaultLogger.getInstance().info("onActivityPaused");
            }

            @Override
            public void onActivityStopped(Activity activity) {
//                DefaultLogger.getInstance().info("onActivityStopped");
            }

            @Override
            public void onActivitySaveInstanceState(Activity activity, Bundle outState) {
//                DefaultLogger.getInstance().info("onActivitySaveInstanceState");
            }

            @Override
            public void onActivityDestroyed(Activity activity) {
//                DefaultLogger.getInstance().info("onActivityDestroyed");
            }
        });
  }
}
