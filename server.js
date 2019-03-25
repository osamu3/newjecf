'use strict';
//const debug   = require('debug');
const express = require('express');
const path    = require('path');
const favicon = require('serve-favicon');
const fs      = require('fs');
// app.use/routes/etc...
const rootAccss  = require('./routes/index');

const app     = express();
const PORT    = 8080;
const http    = require('https').Server(app);
//const server  = app.listen(PORT, () => console.log('Example app listening on port 8080!'));
//const io      = require('socket.io').listen(server);
const io      = require('socket.io')(http);

http.listen(PORT,() => console.log('Server listening on Port:' + PORT));

let userId;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.engine('html',require('ejs').renderFile);//<- 'html'を使えるように

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.static(path.join(__dirname, 'public')));

//Express での静的ファイルの提供 ←重要
//http://expressjs.com/ja/starter/static-files.htmlより
app.use('/static', express.static('public'));//←別名定義例(クライアント側で使用)これで、"public"を"/static" で利用できる。
app.use(express.static('public'));  //パス文字列無しで"public"を使用できるように設定。

//↓ルートへのアクセスで、rootAccdd(./routes/index.js)を呼び出す。
//index.js内のapp.get('/'…)で、描画するファイルを指定している。
app.use('/', rootAccss);



//↓のエラー処理は、ルーティングの指定より後にしないとエラーが出る。
//cf:https://chaika.hatenablog.com/entry/2015/10/07/135131
// catch 404 and forward to error handler ← 404発生時の処理
app.use(function (req, res, next) {
    var err = new Error('Not---- Found');
    err.status = 404;
    next(err);
});

//app.get('/', (req, res) => res.send('Hello World!'));

////接続確立時の処理
io.on('connection', function (socket) {
    console.log('connected!! socket.id=' + socket.id);
    //ブラウザからの着信:[msg]は、'takeAPic''openTheDoor''ContinueToProcess?'の３種類のはず
    socket.on('Bs2Sv', function (msg) {
        console.log('(server.js:L52)：→GetMessage(Bs2Sv【'+msg+'】):Browser→Server');

        if (msg === 'ContinueToProcess?') {//ブラウザからの処理継続要求、(※注！ラズパイは別)
            if (userId != null) { //既に接続が完了している場合、新たな接続は受け付けない
                console.log('    Already Connected! 接続不許可、切断します。')
                io.to(socket.id).emit('Sv2Bs', 'Disconnnect')//着信メッセージの送り主に返信
                io.sockets.connected[socket.id].disconnect();
            } else {
                userId = socket.id;//たった今接続してきたユーザのsocketIdをとる。
                //接続を継続し、写真を撮るを準備せよ。をブロードキャストする。
                console.log('(server.js:L62)：    ←BroadCast(Sv2Bs【ContinueOK】):Browser←Server)');
                io.emit('Sv2Bs', 'ContinueOK');
            }
        }

        if (msg === 'OpenTheDoor') {//ブラウザからの写真撮影準備要求
            console.log('(server.js:L68)：    ←BroadCast(Sv2Pi【OpenTheDoor】):Pi←Server)');
            io.emit('Sv2Pi', msg);//[openTheDoor]を送信：邪魔臭いのでブロードキャスト
            console.log('');
        }

        if (msg === 'TakeAPic') {//ブラウザから写真撮影依頼
            console.log('(server.js:L74)：    ←BroadCast(Sv2Pi【TakeAPic】:Pi←Server)');
            io.emit('Sv2Pi', msg);//[takeAPic]をブロードキャスト送信
            //コマンド送信後5秒後、リセット送信。←本番は15秒？
            setTimeout(function () {
                console.log('(server.js:L78)←BroadCast(Sv2All【Reset】):Pi←Server');
                io.emit('Sv2All', 'Reset');
                console.log('');
            }, 5000);
        }
    });

    //パイからの受信:[msg]は、パイ側でソケットコネクトイベントが発火した旨の通知のはず
    socket.on('Pi2Sv', function (msg) {
        console.log('(server.js:L85)Piメッセージ('+msg+')を転送した方がよいのでは？');
        console.log('');
    });

    //ラズパイからの、FTPアップロード完了のメッセージを受信
    socket.on('Pi2UpLoadPht', function (photUName) {//一意な写真ファイル名
        console.log("(server.js:L42)サーバーログ:ラズパイから画像転送がありました。:" +photUName);
        //サーバーから写真転送完了のお知らせをクライアントへ通知
        io.emit('Sv2FtpPht', photUName);//クライアント側ではリロード
        console.log("(server.js:L45)emit:Sv2FtpPht");
    });

    socket.on("disconnect", function () {
        console.log("[disconnect]イベントが発生:   GET OUT !!   ");
        userId = null; //ブラウザからは、誰も接続していないことにする。※注！ラズパイは別
        console.log("userIdを初期化\n");
    });
});
/////////////////////////参考//////////////
/*
    io.sockets.emit("info", "全員に送信")　//送信元含む全員に送信
    io.emit("info", "省略可")　//上と同じ
    socket.broadcast.emit("info", "送信元以外に送信")　//送信元以外の全員に送信
    io.to(socket.id).emit('info', '送信元にだけ')　//特定のユーザーのみ（送信元のみに送信）

*/
/////////////////////////////////////////////;

