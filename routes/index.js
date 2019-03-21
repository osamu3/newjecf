'use strict';
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'GBird',content:'hogehoge' });
});

module.exports = router;
//D
//↑このモジュールは、server.jsから、↓として使用されている。
//const routes = require('./routes/index');
//app.use('/', routes);//ルートへのアクセスで、↑で定義したroutesを呼び出す。
//server.js内では、「route」ではなく「routes」と複数形になっていることに注意。
//
