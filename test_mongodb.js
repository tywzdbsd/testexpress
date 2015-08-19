var mongo = require('./mongo_wrapper.js');
var server = "mongodb://localhost:27017/test";
//console.log(mongo);
/*
mongo.insert(server, "myscore", {_id: 1, name: 'Max', score: 4523}, function(err, result) {
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
});*/
// $gte: 大于等于
// $gt: 大于
// $lte: 小于等于
// $lt: 小于
// $ne: 不等于
// $in: 在数组中
// $nin: 不在s
mongo.get(server, "myscore", {'score': {'$gte':3000}}, function(err, result) {
    if (err) console.log(err);
    console.log(result);
});

console.log(global);