### [HTTP](http://www.ruanyifeng.com/blog/2016/08/http.html)
- http2.0
- http0.9
- http1.0 各种头信息
- http1.1 
  - connection: keep-alive/ connnection: close 6个
  - pipe: 
  - content-length 区分多个请求
  - transfer-encoding: chunked stream 16进制 + 内容
  - 新增 rest方法
  - host
- http2/spdy
  - 二进制协议：头信息、数据体都是二进制
  - 多工：不用按照顺序
  - 数据流：请求或响应的数据包，id为奇数，服务端id偶数，优先级
  - 头信息压缩：压缩，索引
  - 服务器推送：

- http协议内容、请求头、缓存等、cookie、session、http2、常见状态200、301、302等
- pwa、mainfest