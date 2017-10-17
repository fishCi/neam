package com.ccb.neam.utils;

import android.app.ActivityManager;
import android.content.Context;
import android.os.Environment;
import android.util.Log;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * Created by niesha.zh on 2017/10/8.
 */

public class LogUtils {

    private static String TAG = "LogToFile";

    private static String logPath = null;//log日志存放路径

    private static Date date = new Date();//因为log日志是使用日期命名的，使用静态成员变量主要是为了在整个程序运行期间只存在一个.log文件中;

    private static String fileName = null;

    /**
     * 初始化，须在使用之前设置，最好在Application创建时调用
     *
     * @param context
     */
    public static void init(Context context) {
        logPath = getFilePath(context) + "/Logs";//获得文件储存路径,在后面加"/Logs"建立子文件夹
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd_HH-mm-ss");//日期格式;
        fileName = logPath + "/log_" + dateFormat.format(date) + ".log";//log日志名，使用时间命名，保证不重复

        //如果父路径不存在
        File file = new File(logPath);
        if (!file.exists()) {
            file.mkdirs();//创建父路径
        }
    }

    /**
     * 获得文件存储路径
     *
     * @return
     */
    private static String getFilePath(Context context) {

        if (Environment.MEDIA_MOUNTED.equals(Environment.MEDIA_MOUNTED) || !Environment.isExternalStorageRemovable()) {//如果外部储存可用
            String processName = getProcessName(context);
            String workPath = Environment.getExternalStorageDirectory().getAbsolutePath() + "/" + processName;

            return workPath;//获得外部存储路径
        } else {
            return context.getFilesDir().getPath();//直接存在/data/data里，非root手机是看不到的
        }
    }

    private static final char VERBOSE = 'v';

    private static final char DEBUG = 'd';

    private static final char INFO = 'i';

    private static final char WARN = 'w';

    private static final char ERROR = 'e';

    public static void v(String tag, String msg) {
        writeToFile(VERBOSE, tag, msg);
    }

    public static void d(String tag, String msg) {
        writeToFile(DEBUG, tag, msg);
    }

    public static void i(String tag, String msg) {
        writeToFile(INFO, tag, msg);
    }

    public static void w(String tag, String msg) {
        writeToFile(WARN, tag, msg);
    }

    public static void e(String tag, String msg) {
        writeToFile(ERROR, tag, msg);
    }

    /**
     * 将log信息写入文件中
     *
     * @param type
     * @param tag
     * @param msg
     */
    private static void writeToFile(char type, String tag, String msg) {

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//日期格式;

        if (null == logPath) {
            Log.e(TAG, "logPath == null ，未初始化LogToFile");
            return;
        }

        String log = dateFormat.format(new Date()) + " " + type + " " + tag + " " + msg + "\n";//log日志内容，可以自行定制

        FileOutputStream fos = null;//FileOutputStream会自动调用底层的close()方法，不用关闭
        BufferedWriter bw = null;
        try {

            fos = new FileOutputStream(fileName, true);//这里的第二个参数代表追加还是覆盖，true为追加，flase为覆盖
            bw = new BufferedWriter(new OutputStreamWriter(fos));
            bw.write(log);

        } catch (FileNotFoundException e) {
            Log.e("TAG", "", e);
        } catch (IOException e) {
            Log.e("TAG", "", e);
        } finally {
            try {
                if (bw != null) {
                    bw.close();//关闭缓冲流
                }
            } catch (IOException e) {
                Log.e("TAG", "", e);
            }
        }

    }


    public static String getProcessName(Context context) {
        String processName = getProcessNameByCmdLine();
        if (null != processName)
            return processName;

        int pid = android.os.Process.myPid();
        ActivityManager manager = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
        List<ActivityManager.RunningAppProcessInfo> infos = manager.getRunningAppProcesses();
        if (infos != null) {
            for (ActivityManager.RunningAppProcessInfo processInfo : infos) {
                if (processInfo.pid == pid) {
                    return processInfo.processName;
                }
            }
        }

        return null;
    }
    private static String getProcessNameByCmdLine() {
        try {
            File file = new File("/proc/" + android.os.Process.myPid() + "/" + "cmdline");
            BufferedReader mBufferedReader = new BufferedReader(new FileReader(file));
            String processName = mBufferedReader.readLine().trim();
            mBufferedReader.close();
            return processName;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
