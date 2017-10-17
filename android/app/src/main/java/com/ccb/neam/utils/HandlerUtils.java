package com.ccb.neam.utils;

import android.app.Activity;
import android.app.Dialog;
import android.content.Context;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.ccb.neam.R;

/**
 * Created by niesha.zh on 2017/10/12.
 */

public class HandlerUtils {

    private static Activity context;

    public static void setContext(Activity context) {
        HandlerUtils.context = context;
    }

    public static void sendToMain(int messageType, final Object messageInfo) {
        switch (messageType) {
            /*case MyConstants.L_LOADING_START : {
                context.runOnUiThread(new Runnable(){
                    @Override
                    public void run() {
                        HandlerUtils.createLoadingDialog(context, (String)messageInfo);
                    }
                });
                break;
            }
            case MyConstants.L_LOADING_END: {
                context.runOnUiThread(new Runnable(){
                    @Override
                    public void run() {
                        HandlerUtils.closeDialog();
                    }
                });
                break;
            }*/
            case MyConstants.L_LOGIN_FAILURE : {
                ToastUtils.showToast(context, (String)messageInfo);
                break;
            }
            case MyConstants.L_LOGIN_SUCCESS : {
                ToastUtils.showToast(context, "登陆成功");
                break;
            }
        }
    }

//    private static PopupWindow loading;
//
//    public static void showLoading(Activity activity) {
//        View popView = activity.getLayoutInflater().inflate(R.layout.pop_loading_layout, null, false);
//        //运行动画
//        ((AnimationDrawable) (popView.findViewById(R.id.pop_loading_view)).getBackground()).start();
//
//        loading = new PopupWindow(popView,
//                ViewGroup.LayoutParams.MATCH_PARENT,
//                ViewGroup.LayoutParams.MATCH_PARENT);
//        loading.setTouchable(true);
//        loading.setOutsideTouchable(false);
//        loading.setBackgroundDrawable(null);
//        //获取Activity的内容页
//        loading.showAtLocation(activity.getWindow().getDecorView().findViewById(android.R.id.content), Gravity.START | Gravity.TOP, 0, 0);
//        loading.update();
//    }

    private static Dialog cuurentDialog = null;

    public static void createLoadingDialog(Context context, String msg) {
        /*if (cuurentDialog != null) {
            closeDialog();
        }

        LayoutInflater inflater = LayoutInflater.from(context);
        View v = inflater.inflate(R.layout.dialog_loading, null);// 得到加载view
        LinearLayout layout = (LinearLayout) v
                .findViewById(R.id.dialog_loading_view);// 加载布局
        TextView tipTextView = (TextView) v.findViewById(R.id.tipTextView);// 提示文字
        tipTextView.setText(msg);// 设置加载信息

        Dialog loadingDialog = new Dialog(context, R.style.MyDialogStyle);// 创建自定义样式dialog
        loadingDialog.setCancelable(true); // 是否可以按“返回键”消失
        loadingDialog.setCanceledOnTouchOutside(false); // 点击加载框以外的区域
        loadingDialog.setContentView(layout, new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT,
                LinearLayout.LayoutParams.MATCH_PARENT));// 设置布局
        
        //将显示Dialog的方法封装在这里面
		
        Window window = loadingDialog.getWindow();
        WindowManager.LayoutParams lp = window.getAttributes();
        lp.width = WindowManager.LayoutParams.MATCH_PARENT;
        lp.height = WindowManager.LayoutParams.WRAP_CONTENT;
        window.setGravity(Gravity.CENTER);
        window.setAttributes(lp);
        window.setWindowAnimations(R.style.PopWindowAnimStyle);
        loadingDialog.show();

        cuurentDialog = loadingDialog;*/
    }

    /**
     * 关闭dialog
     */
    public static void closeDialog() {
        /*if (cuurentDialog == null) return;

        if (cuurentDialog != null && cuurentDialog.isShowing()) {
            cuurentDialog.dismiss();
        }*/
    }
}
