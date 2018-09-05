### 安全
- [xss：原理、如何防范](http://blog.csdn.net/hcl1687/article/details/47666847)
- xss:代码注入
  - 分类：
    - 持久型：提交代码，注入到数据库中，例如留言板
    - 反射型：构造漏洞url，注入代码
    - 基于dom型：
  - 防范：
    - 编码：服务端输入，客户端输出编码
    - 校验：黑名单处理
    - [cookie](http://www.infoq.com/cn/articles/cookie-security/)
      - httponly
      - 域设置

- [csrf：原理、如何防范](https://zh.wikipedia.org/wiki/%E8%B7%A8%E7%AB%99%E8%AF%B7%E6%B1%82%E4%BC%AA%E9%80%A0)
- 会话劫持、one-click、请求伪造
  - 防范：
    - token
    - refer校验
    - httponly

- 越权
  - 水平越权：访问控制攻击，修改userid，不直接传递，改为加密的cookie
    - id:无规则，唯一，不可遍历，短
    - url：
    - debug
    - session/token，设置过期时间
  - 垂直越权：猜测其他权限的url，权限校验

- HTTP RESPONSE SPLITTING
\r\n，多段http response，重定向，操作cookie等

- SSRF:篡改请求资源的地址，以服务器的身份去访问内网资源
  - 识别危险跳转：ip 内网域名

- HTTP PARAMETER POLLUTION：参数名同名，过滤

- click jacking: 点击劫持 增加X-FRAME-OPTIONS deny

- ISP HIJACKING: [运营商劫持](https://www.cnblogs.com/xywq/p/7207843.html)

- Cross-Site Tracing: curl -X TRACE -b a=1 -i http://127.0.0.1:7001 trace track options