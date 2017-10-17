package com.ccb.neam.utils;


import android.util.Log;

/**
 * Created by niesha.zh on 2017/9/27.
 */

public class DefaultLogger {

    private DefaultLogger() {

    }

    private static String TAG = "DEFAULT";

    private static final DefaultLogger instance = new DefaultLogger();

    public static DefaultLogger getInstance() {
        return instance;
    }

    public void info(String msg) {
        Log.i(TAG, msg);
    }

    public void debug(String msg) {
        Log.d(TAG, msg);
    }

    public void error(String msg) {
        Log.e(TAG, msg);
    }

    public void warn(String msg) {
        Log.w(TAG, msg);
    }

    public void info(String msg, Throwable t) {
        Log.i(TAG, msg, t);
    }

    public void debug(String msg, Throwable t) {
        Log.d(TAG, msg, t);
    }

    public void error(String msg, Throwable t) {
        Log.e(TAG, msg, t);
    }

    public void warn(String msg, Throwable t) {
        Log.w(TAG, msg, t);
    }
}
