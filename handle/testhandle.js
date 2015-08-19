/**
 * Created by tyw on 15/8/19.
 */
var express = require('express');
var app = express();

////单个回调函数处理路由
//app.get('/example/a', function (req, res) {
//    res.send('Hello from A!');
//});

////多个回调函数处理路由,先运行第一个回调函数，再调用第二个回调函数,先输出A...再输出B...
//app.get('/example/a', function (req, res, next) {
//    console.log('[A callback] data will be send by next function');
//    next();
//}, function (req, res) {
//    console.log('[B callback] data will be send by this function');
//    res.send('Hello from B');
//});
//
////使用回调函数数组处理路由：
//var cb0 = function (req, res, next) {
//    console.log('CB0');
//    next();
//}
//
//var cb1 = function (req, res, next) {
//    console.log('CB2');
//    next();
//}
//
//var cb2 = function (req, res, next) {
//    res.send('Hello from C');
//}
//
//app.get('/example/c', [cb0, cb1, cb2]);
//
////混合使用函数和函数组处理路由：
//var cb0 = function (req, res, next) {
//    console.log('CB0');
//    next();
//}
//
//var cb1 = function (req, res, next) {
//    console.log('CB1');
//    next();
//}
//
//app.get('/example/d', [cb0, cb1], function (req, res, next) {
//    console.log('response will be sent by the next function ...');
//    next();
//}, function (req, res) {
//    res.send('Hello from D!');
//});

//下载图片文件的请求
app.get('/download/company.jpg', function (req,res) {
res.
});

//app.use(express.static('../asset'));


var server = app.listen('3000', function () {
    var port = server.address().port;
    console.log('express server started at http://localhost:' + port);
});
