'use strict';
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'GBird',content:'hogehoge' });
});

module.exports = router;
//↑このモジュールは、server.jsから、↓として使用されている。
//const rootAccss = require('./routes/index');
//webサイトのルートへのアクセス( app.use('/'.... ) で、
//rootAccss→router.get('/',…)を実行する。
