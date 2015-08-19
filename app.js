/**
 * Created by tyw on 15/8/18.
 */
var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/',function(req,res){
    res.send('Got a POST request');
});

app.put('/user',function(req,res){
    res.send('Got a PUT request at /user');
});

app.delete('/user',function(req,res){
    res.send('Got a DELETE request at /user');
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log(server.address());
    console.log('Example app listening at http://%s:%s', host, port);
});

app.use(express.static('files'));
app.use(express.static('public'));



// 上面的代码启动一个服务并监听从 3000 端口进入的所有连接请求。
// 他将对所有 (/) URL 或 路由 返回 “Hello World!” 字符串。
// 对于其他所有路径全部返回 404 Not Found。