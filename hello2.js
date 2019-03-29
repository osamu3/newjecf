// var app = require('express')(); 分かりづらかったので分解
const express = require('express');
const app = express();
// const http = require('http').Server(app); 分かりづらかったので分解
var http = require('http');//「https」にする？
const server = http.Server(app);

// const io = require('socket.io')(server); 分かりづらかったので分解
const socketio = require('socket.io');
const io = socketio.listen(server);

const path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const fs = require('fs');
//const debug = require('debug');

const PORT = 8080;
let userId;

//app.set('view engin','html');
app.set('view engin','ejs');


//Express での静的ファイルの提供 ←重要
//http://expressjs.com/ja/starter/static-files.htmlより
//app.use('/static', express.static('public'));//←別名定義例(クライアント側で使用)これで、"public"を"static" で利用できる。
app.use('/static', express.static(__dirname + '/public'));//←別名定義:"public"を"/static" で利用できる。(念の為、__dirnameを補完)
//↑で、http://hostName/static/…、としてアクセスできる。
app.use(express.static('public'));	//パス文字列無しで"public"を使用できるように設定。
//↑で、http://hostName/…、としてアクセスできる。

//app.get("/", function (req, res, next) { //"/"へのアクセスで、
	//res.render("index", {});//publicのindex.ejsを表示させる。
//	res.render("landing", { message: "hello osam3!!" })
//});

server.listen(PORT,() => console.log('app listening on port '+ PORT));

//http.createServer((request, response) => {
//response.writeHead(200, {'Content-Type': 'text/plain'});
//response.end('Hello World!\n');
//}).listen(PORT);

console.log('おさむのてすと');
console.log('Server running at  http:133.167.47.45:8080');
