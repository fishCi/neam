export function anyofficeCodeUtil(code) {
    switch (code) {
        case -1:
            return  code + '创建TCP连接失败，请检查网络连接和网关的地址和端口是否正确。对于移动终端需要确保网络已激活';
        case -2:
            return code + ',与代理服务建立连接失败，请检查网络和代理服务器地址和端口是否正确。';
        case -3:
            return code + ',代理信息错误，请检查代理用户名、密码、域信息是否正确。';
        case -4:
            return code + ',网络不通，请检查网络环境。';
        case -5:
            return code + ',登录用户名、密码错误。';
        case -6:
            return code + ',无法获取虚拟IP。';
        case -7:
            return code + ',用户数达到上线。';
        case -8:
            return code + ',用户IP受限。';
        case -9:
            return code + ',多媒体隧道功能未开启。';
        case -10:
            return code + ',用户ID无效。';
        case -11:
            return code + ',隧道关闭，用户被迫下线。';
        case -12:
            return code + ',登录网关时，UDP隧道探测超时失败，请检查网络状况。';
        case -13:
            return code + ',登录网关时，服务器证书的CA不匹配，校验失败。';
        case -14:
            return code + ',登录网关时，客户端证书不匹配，校验失败。';
        case -15:
            return code + ',用户被锁定，无法登录。';
        case -16:
            return code + ',auth id方式登录方式，用户名与auth id不匹配，无法登录。';
        case -99:
            return code + ',网关运行异常。';
        case -100:
            return code + ',组件运行异常。';
    }
    return code + ',未知错误';
}