const express = require('express');
const AppConfig = require('./config');
const app = express();
const cors = require("cors");
const port = 3000;

app.use(cors({  
    origin: "http://localhost:8080",
    credentials: true,
    }))

//获配置信息，把app传给配置信息中使用
new AppConfig(app);


//启动监听
app.listen(port,()=>{
    console.log(`服务器已运行,端口号为${port}`);
})