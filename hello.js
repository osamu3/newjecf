//const debug = require('debug');
const http = require('http');
const PORT = 8080;

http.createServer((request, response) => {
response.writeHead(200, {'Content-Type': 'text/plain'});
response.end('Hello World!\n');
}).listen(PORT);

console.log(`Server running at http://localhost:${PORT}/`);
