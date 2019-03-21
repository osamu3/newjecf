'use strict';
//const debug   = require('debug');
const express = require('express');
const path    = require('path');
const favicon = require('serve-favicon');
const fs      = require('fs');
// app.use/routes/etc...
const routes  = require('./routes/index');

const app     = express();
const port    = 8080;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.static(path.join(__dirname, 'public')));

//routesは、./routes/index.jsを呼び出す。
//routesは、./routes/index.js内で、「route」が定義されている。
app.use('/', routes);//ルートへのアクセスで、↑で定義したroutesを呼び出す。

//エラー処理は、ルーティングの指定より後にしないとエラーが出る。
//cf:https://chaika.hatenablog.com/entry/2015/10/07/135131
// catch 404 and forward to error handler ← 404発生時の処理
app.use(function (req, res, next) {
    var err = new Error('Not---- Found');
    err.status = 404;
    next(err);
});

const server  = app.listen(port, () => console.log('Example app listening on port 8080!'));
const io      = require('socket.io').listen(server);
//app.get('/', (req, res) => res.send('Hello World!'));

//接続確立時の処理
io.on('connection', function (socket) {
	console.log("connected!!");
	//ブラウザからサーバーへの全ての着信をクライアントに転送
	socket.on('Bs2Sv', function (msg) {
		console.log("(app.js:L76)サーバーログ:ブラウザからの着信がありました。:" + msg);
		io.emit('Sv2Pi', msg);
	});

	//パイからメッセージが届いた。※現在関係ない
	socket.on('Pi2Sv', function (msg) {
		console.log("(app.js:L89)サーバーログ：ラズパイからの着信がありました。:" + msg);
		io.emit('Sv2Cl', "サーバーより各位へ--->ラズパイからのmsgを転送します。:" + msg);
	});

	//パイから写真アップロード報告があった。
	socket.on('Pi2UpLoadImg', function () {
		console.log("(app.js:L94)サーバーログ:ラズパイから画像アップロードがありました。:");
		io.emit('Sv2ChngImg', '');//ここから、クライアント側での処理をかく、クライアント側ではリロード
	});

	socket.on("disconnect", function () {
		console.log("[disconnect]イベントが発生:   GET OUT !!   ");
	});
});

