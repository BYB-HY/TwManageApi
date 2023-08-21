const express = require('express');
const AppConfig = require('./config');
const app = express();
const cors = require("cors");
const port = 3000;


app.use(cors({
    origin: function(origin, callback) {
      // 定义允许访问的域名列表
      var allowedOrigins = [
        'http://192.168.1.218',
        'http://192.168.1.246:8080',
        'http://localhost:8080',
        'http://192.168.1.218:8081',
        'http://192.168.1.246:8081',
        'http://localhost:8081'
      ];
      // 验证请求的域名是否在允许列表中
      var isAllowed = allowedOrigins.indexOf(origin) !== -1;
      // 如果允许访问，则设置响应头
      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
  }));

//获配置信息，把app传给配置信息中使用
new AppConfig(app);


//启动监听
app.listen(port,()=>{
    console.log(`服务器已运行,端口号为${port}`);
})