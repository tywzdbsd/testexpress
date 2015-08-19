////////////////////////////////////////////////////////////////////////////
///调用的例子程序
////////////////////////////////////////////////////////////////////////////
//var mongo = require('./mongo_wrapper.js');
//var server = "mongodb://localhost:27017/test";
//console.log(mongo);
/*
mongo.insert(server, "myscore", {_id: 1, name: 'max', score: 4523}, function(err, result) {
    if (err) console.log(err);
    //console.log(result);
});
mongo.insert(server, "myscore", {_id: 2, name: 'doudou', score: 45323}, function(err, result) {
    if (err) console.log(err);
    //console.log(result);
});
mongo.insert(server, "myscore", {_id: 3, name: 'apple', score: 3523}, function(err, result) {
    if (err) console.log(err);
    //console.log(result);
});
mongo.insert(server, "myscore", {_id: 4, name: 'julia', score: 2423}, function(err, result) {
    if (err) console.log(err);
    //console.log(result);
});
*/
/*
mongo.all(server, "myscore", function(err, result) {
if (err) console.log(err);
console.log(result);
});
*/
/*
mongo.update(server, "myscore", {name:'Max'}, {name: 'Max',score:18888}, function(err, result) {
    if (err) console.log(err);
    console.log(result);
});
mongo.get(server, "myscore", {
    name: 'Max'
}, function(err, result) {
    if (err) console.log(err);
    console.log(result);
});*/
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var mongodb = require("mongodb");
// 插入数据:
//  db_opt: 为数据库连接，譬如一般为mongodb://localhost:27017，下同 
//  document: 为操作的文档，相当于关系数据库中的table或者dataset，
//  content: 文档内容,相当于关系数据库中的一条记录，可以使用配置_id的方法，自己管理id，也可以自动生成id，mongodb自动生成的id为一个json对象。下同
//  callback：返回操作结果。callback函数典型的实现为function(err, result)，其中，err为错误返回，非0表示错误，result通常返回结果集或者结果
//  
//  *** 建议 ***
//  最好自己管理_id,除非你认为其他属性可以唯一定位数据.
//
//  ** 错误返回值 **
//  ConnectError： 服务器没有开启，或服务器URL错误等。
//  DocumentError： 文档操作错误。
//  OperatorError： 数据操作错误。
//
var insert = function(db_opt, document, content, callback) {
    return mongodb.connect(db_opt, function(err, conn) {
        if (err || conn === null) return callback('ConnectError');
        return conn.collection(document, function(err, doc) {
            if (err) {
                console.log("there is no such table name!");
                conn.close();
                return callback('DocumentError');
            }
            return doc.save(content, function(err, result) {
                if (err) {
                    conn.close();
                    return callback('OperatorError');
                } else {
                    conn.close();
                    return callback(0,"Success");
                }
            });
        });
    });
};
// 参考 insert方法，大部分一致，需要说明的是，get返回的可能是多条记录，具体取决于location
// location： 查询条件，一般描述为对象，譬如在非id属性外，取某个关键属性，如name什么的。
var get = function(db_opt, document, location, callback) {
    return mongodb.connect(db_opt, function(err, conn) {
        if (err || conn === null) return callback('ConnectError');
        return conn.collection(document, function(err, doc) {
            if (err) {
                conn.close();
                return callback('DocumentError');
            }
            return doc.find(location).toArray(function(err, result) {
                if (err) {
                    conn.close();
                    return callback('OperatorError');
                } else {
                    conn.close();
                    return callback(0, result);
                }
            });
        });
    });
};
// all操作和get操作不同之处是条件为空，这两个接口可以合并为一个，分开的目的主要是在通常情况下
// get操作时精准的返回一个对象
//
var all = function(db_opt, document, callback) {
    return mongodb.connect(db_opt, function(err, conn) {
        if (err || conn === null) return callback('ConnectError');
        return conn.collection(document, function(err, doc) {
            if (err) {
                conn.close();
                return callback('DocumentError');
            }
            return doc.find().toArray(function(err, result) {
                if (err) {
                    conn.close();
                    return callback('OperatorError');
                } else {
                    conn.close();
                    return callback(0,result);
                }
            });
        });
    });
};
// *** 更新操作，需要明确地定位到一条记录上，否则是无效的。切记！切记！
// location主要是当作定位用的对象，content是提交结果的对象，需要明确是，这个提交内容是全部（除了_id之外），部分提交
// 会冲掉之前的数据。
var update = function(db_opt, document, location, content, callback) {
    return mongodb.connect(db_opt, function(err, conn) {
        if (err || conn === null) return callback('ConnectError');
        return conn.collection(document, function(err, doc) {
            if (err) {
                conn.close();
                return callback('DocumentError');
            }
            return doc.update(location, content, function(err, result) {
                if (err) {
                    conn.close();
                    return callback('OperatorError');
                } else {
                    conn.close();
                    return callback(0,'Success');
                }
            });
        });
    });
};
//
//
module.exports = {
    insert: insert,
    get: get,
    all: all,
    update: update
};