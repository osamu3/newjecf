//const debug = require('debug');
const express = require('express');
//const ejs = require('ejs')
const app = express();
//サーバデブロイ時には、「https」にすると、ワーニングが出なくなる。ローカル接続では、https証明の発行ができいないので、だめ。
//const http = require("http").Server(app);

const path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const fs = require('fs');

const PORT = 8080;

//Express での静的ファイルの提供 ←重要
//http://expressjs.com/ja/starter/static-files.htmlより
app.use('/static', express.static('public'));//←別名定義例(クライアント側で使用)これで、"public"を"/static" で利用できる。
app.use(express.static('public'));	//パス文字列無しで"public"を使用できるように設定。
app.get("/", function (req, res, next) { //"/"へのアクセスで、publicのindex.htmlを表示させる。
	res.render("index", {title:'自撮り',content:'自撮サイトです。'});
});

/* ビューエンジンは利用しない。htmlで処理
//app.set('view engin','html');
//app.set('ejs',ejs.renderFile);
/* app.get('/',function(req,res){
	//res.render("index", {});
    //res.render("landing",{message:"hello osam3!!"});
    res.render('index.ejs',{title:'Hello world',content:'コンテンツです'})
}); */

app.listen(PORT,() => console.log('app listening on port '+ PORT));

console.log('Server running at  http:133.167.47.45:8080');
