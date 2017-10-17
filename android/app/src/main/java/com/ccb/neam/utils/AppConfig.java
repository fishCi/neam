package com.ccb.neam.utils;

import android.os.Environment;

import com.huawei.anyoffice.sdk.log.Log;

import com.ccb.neam.MainActivity;

/**
 * Created by niesha.zh on 2017/9/27.
 */

public class AppConfig {

    /**
     * 是否开启hook
     */
    public static boolean AnyofficeHook = true;

    public static String getAnyOfficeLogDir() {

        String processName = LogUtils.getProcessName(MainActivity.getInstance());
        String workPath = Environment.getExternalStorageDirectory().getAbsolutePath() + "/" + processName;
//        if (Environment.MEDIA_MOUNTED.equals(Environment.MEDIA_MOUNTED) || !Environment.isExternalStorageRemovable()) {//如果外部储存可用
//            return context.getExternalFilesDir(null).getPath();//获得外部存储路径,默认路径为 /storage/emulated/0/Android/data/com.waka.workspace.logtofile/files/Logs/log_2016-03-14_16-15-09.log
//        } else {
//
//            return context.getFilesDir().getPath();//直接存在/data/data里，非root手机是看不到的
//        }

//        return Environment.DIRECTORY_DOWNLOADS + "/anyofficelog";
        return workPath + "/anyofficelog";
    }

    public static int getAnyOfficeLogLevel() {
        //DEBUG
        return Log.LOG_TYPE_INFO;
    }

    public static String getWorkLogDir() {
        return MainActivity.getInstance().getFilesDir().getAbsolutePath() + "/data/mytest";
    }


}
