- HTTPS
  - https：原理，升级注意点
    - [ssl_tls](http://www.ruanyifeng.com/blog/2014/02/ssl_tls.html)
    - [mixed](https://developers.google.com/web/fundamentals/security/prevent-mixed-content/fixing-mixed-content)
    - [http-to-https](http://www.ruanyifeng.com/blog/2016/08/migrate-from-http-to-https.html)
  - https = http + ssl/tls
  - 目的：身份认证、隐私、完整
    - 过程：
      - c: 随机数、支持的协议版本、加密算法、压缩算法
      - s：随机数、确定的协议版本、证书、确定的加密算法
      - c: 校验证书，成功，取出公钥加密随机数，加密声明，hash值，生成key
      校验域名，是否是可信的证书机构颁发、有效期
      - s：加密声明，私钥解密，取出第三个随机数，生成key，hash值
      - c <> s: key对称加密

  - 缓存: ie无关，ff内存
  - https: ip固定，1个ip1个证书，可使用子域名通配证书
  - 相关设置
    - Strict-Transport-Security：强制此域名使用https形式
    - Content-Security-Policy：
    - upgrade-insecure-requests 升级所有http内容
    - block-all-mixed-content 阻止混合内容
  ```<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">```

  - 混合内容
    - 被动混合内容：audio/video/img/object

    - 主动混合内容：script/link/object data/background-url/font-face/iframe/xmlhttprequest

  - 证书分类：
    1. 域名证书、公司证书、扩展证书
    2. 单域名证书、通配符证书、多域名证书