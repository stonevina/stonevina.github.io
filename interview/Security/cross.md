### [跨域](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)
http://www.ruanyifeng.com/blog/2016/04/cors.html
  1. 产生的原因
  2. 常用的解决方式
  3. option
跨域包括图片、字体、脚本、样式等资源，安全考虑，浏览器限制脚本中的资源请求
- 解决方式：jsonp、cors
- cors: 使用场景：xmlhttprequest/fetch
- jsonp只能针对get方式
- cors方式包括各种请求
  - 简单请求；
  ```get/post/head form-data/x-urlencode-form/text-plain```
  - 复杂请求：
    - 预检option，可缓存
    - req:Origin/Access-Control-Request-Method/Access-Control-Request-Headers
    - res:Access-Control-Allow-Origin/Access-Control-Allow-Methods/Access-Control-Allow-Headers/Access-Control-Max-Age
    - cors：默认不带cookies，withCredentials设置为true