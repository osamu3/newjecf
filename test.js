//var express = require('express');
//var app = express();
//var http = require('http').Server(app);
//const io = require('socket.io')(http);
//const PORT = process.env.PORT || 8080;

/*console.log('PORT:'+PORT+' __dirname:'+__dirname);
app.get('/' , function(req, res){
    res.sendFile(__dirname+'view/index.html');
});*/




// var app = require('express')(); 分かりづらかったので分解
const express = require('express');
const app = express();
// const http = require('http').Server(app); 分かりづらかったので分解
var http = require('http');
const server = http.Server(app);
// const io = require('socket.io')(server); 分かりづらかったので分解
const socketio = require('socket.io');
const io = socketio.listen(server);
const PORT = 8080;
let userId;

//Express での静的ファイルの提供 ←重要
//http://expressjs.com/ja/starter/static-files.htmlより
app.use('/static', express.static('public'));//←別名定義例(クライアント側で使用)これで、"public"を"/static" で利用できる。
app.use(express.static('public'));	//パス文字列無しで"public"を使用できるように設定。
app.get("/", function (req, res, next) { //"/"へのアクセスで、publicのindex.htmlを表示させる。
	res.render("index", {});
});

server.listen(PORT, () => {
	console.log(`listening on *:${PORT}`);
});

