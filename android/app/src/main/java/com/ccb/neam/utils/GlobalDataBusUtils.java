package com.ccb.neam.utils;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by niesha.zh on 2017/9/27.
 */

public class GlobalDataBusUtils {

    private static Map<String, Object> map = new HashMap<String, Object>();

    public static void setValue(String key, Object value) {
        map.put(key, value);
    }

    public static Object getValue(String key) {
        return map.get(key);
    }
}
