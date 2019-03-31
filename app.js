const express = require('express');
const app = express();
const path    = require('path');
//const favicon = require('serve-favicon'); const | var
var favicon = require('serve-favicon'); //const | var
//const fs      = require('fs');

var http = require('http');
const server = http.Server(app);
const PORT = 8080;

const io      = require('socket.io')(http);

let userId;

//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(favicon(path.join(__dirname,'public','favicon.ico')));
app.use('/favicon.ico', express.static('public/favicon.ico'));
app.use("/public", express.static('public')); 

app.set('view engin', 'ejs');

//app.use('/static', express.static(__dirname + '/public'));//←別名定義:"public"を"/static" で利用できる。(念の為、__dirnameを補完)
//↑で、http://hostName/static/…、としてアクセスできる。
//app.use(express.static('public'));	//パス文字列無しで"public"を使用できるように設定。
//↑で、http://hostName/…、としてアクセスできる。

app.get("/", function (req, res, next) { //"/"へのアクセスで、
	res.render("index.ejs", {title  : "ここはルート",content : "views/index.ejsを表示しています。"});
});

//app.get("/map", function (req, res, next) { //mapへのアクセスで、
//	res.render("map.ejs", {title  : "ここはルート",content : "views/index.ejsを表示しています。"});
//});

app.get("/gdori", function (req, res, next) { //gdoriへのアクセスで、
	res.render("gdori.ejs", {title  : "ここは自鳥",content : "views/gdori.ejsを表示しています。"});
});

server.listen(PORT,() => console.log('app listening on port '+ PORT));

console.log('おさむのてすと Ver 0.1.2-2  https://newjec.net/　と　https://newjec.net/gdori/ での振り分け');