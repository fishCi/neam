package com.ccb.neam.utils;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;

/**
 * Created by niesha.zh on 2017/9/27.
 */

public class TimeUtils {

    public static String getCurrentStamp() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
        return sdf.format(new Timestamp(System.currentTimeMillis()));
    }
}
