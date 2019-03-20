//const debug = require('debug');
const express = require('express');
const app = express();
//サーバデブロイ時には、「https」にすると、ワーニングが出なくなる。ローカル接続では、https証明の発行ができいないので、だめ。
const http = require("http").Server(app);

const path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const fs = require('fs');

const PORT = 8080;

//http.createServer((request, response) => {
//response.writeHead(200, {'Content-Type': 'text/plain'});
//response.end('Hello World!\n');
//}).listen(PORT);

console.log('Server running at  http:133.167.47.45:80');
