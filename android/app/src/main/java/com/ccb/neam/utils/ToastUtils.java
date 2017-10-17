package com.ccb.neam.utils;

import android.app.Activity;
import android.content.Context;
import android.util.Log;
import android.widget.Toast;

/**
 * Created by niesha.zh on 2017/10/8.
 */

public class ToastUtils {

    private static String TAG = "ToastUtils";

    /**
     * show toast
     *
     * @param resId
     * @param context
     */
    public static void showToast(int resId, Context context)
    {
        if(context == null)
        {
            Log.e(TAG, "showToast with a null context");
            return;
        }
        Toast.makeText(context, resId, Toast.LENGTH_SHORT).show();
    }

    /**
     * show toast
     *
     * @param context
     * @param res
     */
    public static void showToast(final Activity context, final String res)
    {
        if(context == null)
        {
            Log.e(TAG, "showToast with a null context");
            return;
        }

//        if (Looper.getMainLooper().getThread() == Thread.currentThread()) {
//            Toast.makeText(context, res, Toast.LENGTH_SHORT).show();
//        } else {
            context.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    Toast.makeText(context, res, Toast.LENGTH_SHORT).show();
                }
            });
//        }
    }
}
