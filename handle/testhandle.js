/**
 * Created by tyw on 15/8/19.
 */
var express = require('express');
var app = express();

//单个回调函数处理路由
app.get('/example/a', function (req, res) {
    res.send('Hello from A!');
});

//多个回调函数处理路由,先运行第一个回调函数，再调用第二个回调函数,先输出A...再输出B...
app.get('/example/a', function (req, res, next) {
    console.log('[A callback] data will be send by next function');
    next();
}, function (req, res) {
    console.log('[B callback] data will be send by this function');
    res.send('Hello from B');
});

//使用回调函数数组处理路由：
var cb0 = function (req, res, next) {
    console.log('CB0');
    next();
}

var cb1 = function (req, res, next) {
    console.log('CB2');
    next();
}

var cb2 = function (req, res, next) {
    res.send('Hello from C');
}

app.get('/example/c', [cb0, cb1, cb2]);

//混合使用函数和函数组处理路由：
var cb0 = function (req, res, next) {
    console.log('CB0');
    next();
}

var cb1 = function (req, res, next) {
    console.log('CB1');
    next();
}

app.get('/example/d', [cb0, cb1], function (req, res, next) {
    console.log('response will be sent by the next function ...');
    next();
}, function (req, res) {
    res.send('Hello from D!');
});

//下载图片文件,请求http://localhost:3000/download/company弹出下载
app.get('/download/company', function (req,res) {
res.download('../asset/images/company.jpg');
});

//终结响应处理流程，控制台输出后再也直接结束处理流程，客户端直接结束响应
app.get('/endit', function (req, res) {
    console.log('in endit ');
    res.end();
});

//发送json数据,返回一个json数据到客户端
app.get('/json', function (req, res) {
    console.log('in json ');
    res.json({name:'jack',level:99});
});

//发送json数据用jsonp方式,返回一个json数据到客户端
app.get('/jsonp', function (req, res) {
    console.log('in json ');
    res.json({name:'jack',level:88,method:'jsonp'});
});

//redirect()重定向请求,两个路由方法回调函数都执行过，最后网址变成redirectB，返回一条json数据
app.get('/redirectA', function (req, res) {
    console.log('in redirectA ');
    res.redirect('/redirectB');
});
app.get('/redirectB', function (req, res) {
    console.log('in redirectB ');
    res.send({ret:0,ret_mes:'in redirectB'});
});


//todo 渲染视图模板，待实现
app.set('views', './views')
app.set('view engine', 'jade')

app.post('/render', function (req, res) {
    //res.render('index');
    //console.log(req.query.name);

});

//todo 发送文件以8位字节流的形式,待实现
//app.get('/sendfile', function (req, res) {
//    res.sendFile('/asset/images/company.jpg');
//});




//app.route()创建路由路径的链式路由句柄,使用什么http方法就返回对应值，浏览器中请求默认用get
app.route('/book')
    .get(function (req, res) {
        res.send('Get a  book');
    })
    .post(function (req, res) {
        res.send('Add a book');
    })
    .put(function (req, res) {
        res.send('Updata a book');
    });

//app.use(express.static('../asset'));


var server = app.listen('3000', function () {
    var port = server.address().port;
    console.log('express server started at http://localhost:' + port);
});
