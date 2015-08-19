/**
 * Created by tyw on 15/8/18.
 * 1.获取express模块
 * 2.创建express服务器
 * 3.定义路由为'/'时，get请求返回值
 * 4.监听3000端口
 *
 */
var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World');
});

app.listen(3000);