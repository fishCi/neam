export function anyofficeCodeUtil(code) {
    switch (code) {
        case -1:
            return '建TCP连接失败，请检查网络连接和网关的地址和端口是否正确。对于移动终端需要确保网络已激活---错误码:'+code;
        case -2:
            return '与代理服务建立连接失败，请检查网络和代理服务器地址和端口是否正确---错误码:'+code;
        case -3:
            return '代理信息错误，请检查代理用户名、密码、域信息是否正确---错误码:'+code;
        case -4:
            return '网络不通，请检查网络环境---错误码:'+code;
        case -5:
            return '登录用户名、密码错误---错误码:'+code;
        case -6:
            return '无法获取虚拟IP---错误码:'+code;
        case -7:
            return '用户数达到上线---错误码:'+code;
        case -8:
            return '用户IP受限---错误码:'+code;
        case -9:
            return '多媒体隧道功能未开启---错误码:'+code;
        case -10:
            return '用户ID无效---错误码:'+code;
        case -11:
            return '隧道关闭，用户被迫下线---错误码:'+code;
        case -12:
            return '登录网关时，UDP隧道探测超时失败，请检查网络状况---错误码:'+code;
        case -13:
            return '登录网关时，服务器证书的CA不匹配，校验失败---错误码:'+code;
        case -14:
            return '登录网关时，客户端证书不匹配，校验失败---错误码:'+code;
        case -15:
            return '用户被锁定，无法登录---错误码:'+code;
        case -16:
            return 'auth id方式登录方式，用户名与auth id不匹配，无法登录---错误码:'+code;
        case -99:
            return '网关运行异常---错误码:'+code;
        case -100:
            return '组件运行异常---错误码:'+code;
    }
    return code + ',未知错误';
}