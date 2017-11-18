package com.ccb.neam.utils;

import android.app.Activity;

import com.alibaba.fastjson.JSONObject;
import com.ccb.neam.MainActivity;
import com.ccb.neam.module.JsCallModule;
import com.huawei.anyoffice.sdk.SDKContext;
import com.huawei.anyoffice.sdk.login.LoginAgent;
import com.huawei.anyoffice.sdk.login.LoginParam;
import com.huawei.anyoffice.sdk.network.NetChangeCallback;
import com.huawei.anyoffice.sdk.network.NetStatusManager;
import com.huawei.svn.sdk.webview.SvnWebViewProxy;

import java.io.File;
import java.io.InputStream;
import java.net.InetSocketAddress;
import java.util.Properties;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

/**
 * Created by Administrator on 2017/3/7.
 */

public class AnyOfficeUtil implements NetChangeCallback, Runnable {
//    private static final String Blacklist = "128.192.152.*";
//    private static final String TestServer = ";128.192.165.*;";
    private static final String Blacklist = "10.0.160.46";
    private static final String TestServer = ";128.192.156.*;128.192.165.*;128.192.132.*;128.192.134.*;128.192.135.*;" +
            "128.192.152.*;pub_vt1.nemc.dev.jh;pub_vt1_nh.nemc.dev.jh;128.196.101.*;mb.by.nemc.jh";
    private static final String blacklistFile = "common/blacklist.txt";
    private static final String WhiteList = "localhost;127.0.0.1;*.ccb.com;*.baidu.com;*.amap.com;119.6.87.*;ccvea.jh;172.20.10.*;";

    private static Lock lock = new ReentrantLock();

    private AnyOfficeUtil() {
        //生产
        this.hostIP = "128.196.200.29";//"anyoffice.ccb.com"; // "124.127.253.197";
        this.hostPort = 443;
    }

    private static AnyOfficeUtil instance = new AnyOfficeUtil();

    public static AnyOfficeUtil getInstance() {
        return instance;
    }

    //服务器IP和端口
    private String hostIP;
    private int hostPort;
    public boolean skipAnyoffice = false;
    //context
    private Activity context;

    private String userName;
    private String userPass;
    private LoginParam loginParam;
    private int initFlag = -1;  // -1 未初始化 , 0 正在初始化, 1 初始化成功

    protected int netStatus;
    protected boolean logined = false;

    public boolean isAnyOfficeConnected() {
        return netStatus == NetStatusManager.NET_STATUS_ONLINE;
    }

    public boolean isSkipAnyoffice() {
        return skipAnyoffice;
    }

    public void setSkipAnyoffice(boolean skip) {
        skipAnyoffice = skip;
    }

    // public void setAnyOfficeParam(String hostIp, int port) {
    //     this.hostIP = hostIp;
    //     this.hostPort = port;
    // }

    public String getHost() {
        return hostIP;
    }

    public int getInitFlag() {
        return this.initFlag;
    }

    private void initAssetsProperty() {

        String filePath = "anyoffice.properties";
        try {
            InputStream is = context.getAssets().open(filePath);
            Properties pop = new Properties();
            pop.load(is);
            this.hostIP = pop.getProperty("anyoffice.host", "128.196.200.29").trim();
            this.hostPort = Integer.parseInt(pop.getProperty("anyoffice.port", "443").trim());
            this.skipAnyoffice = !Boolean.parseBoolean(pop.getProperty("anyoffice.enabled", "true").trim());

            //String p2server = pop.getProperty("p2server").trim();
            //GData.setAPP_BASE_URL(p2server);
        } catch (Exception e) {
            DefaultLogger.getInstance().error("anyOffice initAssetsProperty error: " + e.getMessage());
        }

        if (this.skipAnyoffice) {
            this.hostIP = "";
            DefaultLogger.getInstance().info("jump anyoffice true");
        }
    }

    /***
     * 初始化anyOffice
     *
     * @param context
     */
    public void initAnyOffice(Activity context) {
        this.context = context;
        initAssetsProperty();
        if (skipAnyoffice) return;
        if (this.initFlag >= 0) return;
        this.initFlag = 0;

        new Thread(new Runnable() {
            @Override
            public void run() {
                doInit();
            }
        }).start();
    }
    private void doInit() {
        //HandlerUtils.sendToMain(MyConstants.L_LOADING_START, "初始化中...");

        DefaultLogger.getInstance().info("开始anyOffice初始化log");
        DefaultLogger.getInstance().info(">>>>> anyoffice use hook: " + AppConfig.AnyofficeHook);

        SDKContext ctx = SDKContext.getInstance();
        NetStatusManager.getInstance().setNetChangeCallback(this);
        String ayLogDir = AppConfig.getAnyOfficeLogDir();
        int ayLogLevel = AppConfig.getAnyOfficeLogLevel();
        File mFile = new File(ayLogDir);
        if (!mFile.exists()) {
            mFile.mkdir();
        }

        SDKContext.getInstance().setLogParam(ayLogDir, ayLogLevel);

        String workPath = AppConfig.getWorkLogDir();
        mFile = new File(ayLogDir);
        if (!mFile.exists()) {
            mFile.mkdir();
        }
        //初始化
        boolean inited = ctx.init(context, workPath);
//        AnyOfficeSDK.init(context, workPath);

        // 设置hook 黑白名单设置，参数2域名是否走隧道 ip only , not port;
        if (AppConfig.AnyofficeHook) {
            // step 1
            ctx.hookNetworkEnable();
            // step 2
            setWhitelist(WhiteList);
//            setBlacklist(Blacklist);
            // step 3
            ctx.hookInit();
        }

//        try {
//            Thread.sleep(10000);
//        } catch (InterruptedException e) {
//            e.printStackTrace();
//        }

//        synchronized (this) {
        //HandlerHelper.getInstance().sendMessage(true, 0, IConfig.AnyofficeInitOK);
            this.initFlag = 1;
//        }

        DefaultLogger.getInstance().info("结束anyOffice初始化log");
        //HandlerUtils.sendToMain(MyConstants.L_LOADING_END, null);
    }

    protected void initLoginParam() {
        loginParam = new LoginParam();
        // 设置应用的业务类型，
        loginParam.setServiceType(MainActivity.getInstance().getPackageName());
        loginParam.setLoginTitle("NSAM");
        loginParam.setAutoLoginType(LoginParam.AutoLoginType.auto_login_disable);  // 不开启单点登录
        loginParam.setLoginBackground(true);  // 使用自己的登录界面
        loginParam.setUseSecureTransfer(true);
//            loginParam.setTokenEnable(false);
        InetSocketAddress add = new InetSocketAddress(hostIP, hostPort);
        //DefaultLogger.getInstance().info(">>>>> anyoffice config: 128.196.200.29:443");
        loginParam.setInternetAddress(add);

        LoginParam.UserInfo info = loginParam.new UserInfo();
        info.userName = userName;
        info.password = userPass;
        info.domain=hostIP;
        loginParam.setUserInfo(info);

        //TODO 生产环境上可能需要改成true
        loginParam.setAuthGateway(false);
        //dynamicUid,staticUid
        //TODO 生产环境上需要改成dynamicUid，并且改成域名登陆而不是ip地址
        loginParam.setuserType("staticUid");
    }

    private String getTestServer() {
//        if (BuildConfig.DEBUG) {
//            return TestServer;
//        } else {
            return "";
//        }
    }

    public void setBlacklist(String blacklist) {
        if (skipAnyoffice) return;
//        已经试验 在anyoffice 登录成功之后, 再设置, 也是ok 的
//        而且之前设置过的名单, 这次没有设置, 好像依然生效
//        重复设置也没问题
        String list = blacklist + getTestServer();
        DefaultLogger.getInstance().info("set blacklist : " + list);
        SvnWebViewProxy.getInstance().setExceptionAddressList(false, list);
    }

    public void setWhitelist(String whitelist) {
        if (skipAnyoffice) return;
        DefaultLogger.getInstance().info("set whitelist : " + whitelist);
        SvnWebViewProxy.getInstance().setExceptionAddressList(true, whitelist);
    }

    public void updateWhitelist() {
//        String list = CCBResourceUtil.getInstance().getFileCotent(whitelistFile);
//        String list = CCBResourceUtil.getInstance().getWWWConfString("whitelist", null);
//        if(list == null) {
//            DefaultLogger.getInstance().error("no whitelist cfg found , use default whitelist");
//        } else if(!CommHelper.checkNull(list)) {
//            setWhitelist(list.trim());
//        } else {
//            DefaultLogger.getInstance().info("no more whitelist to set again");
//        }
    }

    public void updateBlacklist() {
//        String list = CCBResourceUtil.getInstance().getFileCotent(blacklistFile);
//        if(list == null) {
//            DefaultLogger.getInstance().error("no blacklist file found , use default balcklist");
//        } else if(!CommHelper.checkNull(list)) {
//            setBlacklist(list.trim());
//        } else {
//            DefaultLogger.getInstance().info("no more blacklist to set again");
//        }
    }

    public void setHostAndPort(String host, int port) {
        this.hostIP = host;
        this.hostPort = port;
    }

    /***
     * 开始登录
     *
     * @param userName
     * @param userPass
     */
    public int startLogin(Activity context, String userName, String userPass) {
        if(skipAnyoffice) {
            //HandlerHelper.getInstance().sendMessage(true, 0, AppConfig.H_AnyOffice_LOGIN_OK);
            return 0;
        }
        logined = false;

        this.userName = userName;
        this.userPass = userPass;
        this.context = context;

        initLoginParam();

//        synchronized (this) {
        if(this.initFlag > 0) return doLoginSync();
            else return 1;
//            else {
//                final HandlerListener hl = new HandlerListener() {
//                    @Override
//                    public void handleMessage(Message msg, boolean mainThread) {
//                        if(msg.what == IConfig.AnyofficeInitOK)
//                            doLogin();
//                    HandlerHelper.getInstance().removeHandleListener(hl);
//                    }
//                };
//                HandlerHelper.getInstance().addHandleListener(hl);
//            }
//        }
    }

    private void doLogin() {
        new Thread(this).start();
    }

    private int doLoginSync() {
        int loginstatus = loginSync();

        if (loginstatus == Integer.MIN_VALUE) {
            return 1;
        } else if (loginstatus != 0) {
            JsCallModule.onNetConnecting(false);
            //HandlerUtils.sendToMain(MyConstants.L_LOADING_END, null);
            //HandlerHelper.getInstance().sendMessage(true, 0, AppConfig.H_AnyOffice_LOGIN_Fail, getAnyofficceByCode(loginstatus));
            //ToastUtils.showToast(context, "登陆失败:" + getAnyofficceByCode(loginstatus));
            JsCallModule.onLoginError(loginstatus);
            return loginstatus;
        } else {
            checkNetStatus(25);
        }
        logined = true;
        return 0;
    }

    /***
     * 重新登录
     */
    public void reStartLogin() {
        if( skipAnyoffice ) return;
        if (loginParam != null) {
            run();
        }
    }

    private int loginSync() {
        if (lock.tryLock()) {

            DefaultLogger.getInstance().info("start anyOffice loginSync" + TimeUtils.getCurrentStamp());
            long start = System.currentTimeMillis();
            logined = false;

            try {
                int rs = LoginAgent.getInstance().loginSync(context, loginParam);
                if (rs ==0) {
                    logined = true;
                }
                return rs;
            } finally {
                lock.unlock();
                DefaultLogger.getInstance().info("end anyOffice loginSync" + TimeUtils.getCurrentStamp() + "耗时：" + String.valueOf(System.currentTimeMillis() - start) + "ms");
            }
        } else {
            //未获得执行权，当前可能有其他线程执行登陆功能，此次不执行
            return Integer.MIN_VALUE;
        }
    }

    public void onResume() {
        if(skipAnyoffice) return;
        if (initFlag == 0 || context == null) return;
        if (!logined) return;

        int netStatus = NetStatusManager.getInstance().getNetStatus();
        DefaultLogger.getInstance().debug("后台切回，监测网络状态:" + netStatus);
        if (netStatus == -99) {
//            JSONObject jsonObject = new JSONObject();
//            jsonObject.put("timeout", 30);
//            jsonObject.put("style", 0);
//            jsonObject.put("text", "正在重新建立网络连接");
//
//            HandlerUtils.sendToMain(MyConstants.L_LOADING_START, "网络重连中...");
            JsCallModule.onNetConnecting(true);
            new Thread(this).start();
        } else if (netStatus != 1 && netStatus != -99) {
            new Thread() {
                @Override
                public void run() {
                    checkNetStatus(25);
                }

            }.start();
        }
    }


    private void checkNetStatus(final int maxcount) {
        //HandlerUtils.sendToMain(MyConstants.L_LOADING_START, "检查连接中...");
        JsCallModule.onNetConnecting(false);

        int netStatus = -1;
        int count = 0;
        while (count < maxcount) {
            netStatus = NetStatusManager.getInstance().getNetStatus();
            if (netStatus == 1) {
                break;
            }
            try {
                Thread.currentThread().sleep(500);
            } catch (InterruptedException e) {

            }
            count++;
        }

        //HandlerUtils.sendToMain(MyConstants.L_LOADING_END, null);
        JsCallModule.onNetConnecting(true);

        if (netStatus == 1) {
            GlobalDataBusUtils.setValue(MyConstants.USE_ANY_OFFICE, "1");
            //HandlerHelper.getInstance().sendMessage(true, 0, AppConfig.H_AnyOffice_LOGIN_OK);
            //HandlerUtils.sendToMain(MyConstants.L_LOGIN_SUCCESS, null);
            DefaultLogger.getInstance().info(">>>>>>> anyoffice vpn ok");
            JsCallModule.onNetConnected();
        } else {
            GlobalDataBusUtils.setValue(MyConstants.USE_ANY_OFFICE, "0");
            //HandlerHelper.getInstance().sendMessage(true, 0, AppConfig.H_AnyOffice_LOGIN_Fail, netStatus + ",anyOffice隧道网络异常");
            //HandlerUtils.sendToMain(MyConstants.L_LOGIN_FAILURE, netStatus + ",anyOffice隧道网络异常");
            DefaultLogger.getInstance().info(">>>>>>> anyoffice vpn fail:" + netStatus);
            JsCallModule.onNetError(netStatus);
        }
    }

    @Override
    public void onNetChanged(int oldStatus, int newStatus, int errCode) {
        if (!logined) return;
        DefaultLogger.getInstance().info("网络状态变化,oldStatus=" + oldStatus + ",newStatus=" + newStatus + ",errorCode=" + errCode + "时间：" + TimeUtils.getCurrentStamp());
        this.netStatus = newStatus;

        if(newStatus == NetStatusManager.NET_STATUS_ONLINE) {
            DefaultLogger.getInstance().debug("anyoffice 已连接");
            //HandlerUtils.sendToMain(MyConstants.L_LOADING_END, null);
            JsCallModule.onNetConnected();

        } else if (newStatus == NetStatusManager.NET_STATUS_OFFLINE) {
            if (errCode == -5 || errCode == -99) {
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("timeout", 30);
                jsonObject.put("style", 1);
                jsonObject.put("text", "正在重新建立网络连接...");

                //HandlerUtils.sendToMain(MyConstants.L_LOADING_START, "网络重连中...");
                JsCallModule.onNetConnecting(true);
                DefaultLogger.getInstance().info("收到 NetChangeCallback回调,再次登陆");
                reStartLogin();
                //HandlerUtils.sendToMain(MyConstants.L_LOADING_END, null);
                JsCallModule.onNetConnecting(false);
                DefaultLogger.getInstance().info("收到 NetChangeCallback回调登陆完成");
            } else {
               // ToastUtils.showToast(context, "网络异常");
                DefaultLogger.getInstance().error("网络异常" + errCode);
                JsCallModule.onNetError(errCode);
            }

        }
    }

    @Override
    public void run() {
        int loginstatus = loginSync();

        if (loginstatus == Integer.MIN_VALUE) {
            //HandlerUtils.sendToMain(MyConstants.L_LOADING_END, null);
            //JsCallModule.callJsAsync("onNetConnecting", "1");
            return;
        } else if (loginstatus != 0) {
            //HandlerUtils.sendToMain(MyConstants.L_LOADING_END, null);
            JsCallModule.onNetConnecting(false);
            //HandlerHelper.getInstance().sendMessage(true, 0, AppConfig.H_AnyOffice_LOGIN_Fail, getAnyofficceByCode(loginstatus));
            //ToastUtils.showToast(context, "登陆失败:" + getAnyofficceByCode(loginstatus));
            JsCallModule.onNetError(loginstatus);
            return;
        } else {
            checkNetStatus(25);
        }
    }

    public String getAnyofficceByCode(int code) {
        switch (code) {
            case -1:
                return "" + code + ",创建TCP连接失败，请检查网络连接和网关的地址和端口是否正确。对于移动终端需要确保网络已激活。";
            case -2:
                return "" + code + ",与代理服务建立连接失败，请检查网络和代理服务器地址和端口是否正确。";
            case -3:
                return "" + code + ",代理信息错误，请检查代理用户名、密码、域信息是否正确。";
            case -4:
                return "" + code + ",网络不通，请检查网络环境。";
            case -5:
                return "" + code + ",登录用户名、密码错误。";
            case -6:
                return "" + code + ",无法获取虚拟IP。";
            case -7:
                return "" + code + ",用户数达到上线。";
            case -8:
                return "" + code + ",用户IP受限。";
            case -9:
                return "" + code + ",多媒体隧道功能未开启。";
            case -10:
                return "" + code + ",用户ID无效。";
            case -11:
                return "" + code + ",隧道关闭，用户被迫下线。";
            case -12:
                return "" + code + ",登录网关时，UDP隧道探测超时失败，请检查网络状况。";
            case -13:
                return "" + code + ",登录网关时，服务器证书的CA不匹配，校验失败。";
            case -14:
                return "" + code + ",登录网关时，客户端证书不匹配，校验失败。";
            case -15:
                return "" + code + ",用户被锁定，无法登录。";
            case -16:
                return "" + code + ",auth id方式登录方式，用户名与auth id不匹配，无法登录。";
            case -99:
                return "" + code + ",网关运行异常。";
            case -100:
                return "" + code + ",组件运行异常。";
        }
        return "" + code + ",未知错误";
    }

    public void logout() {
        //TODO
    }
}
