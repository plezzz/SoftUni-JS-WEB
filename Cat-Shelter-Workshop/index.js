const config = require('./config.json');
const http = require('http');

function httpHandler(req, res) {
res.end('Hello')
}

http.createServer(httpHandler).listen(config.port, function () {
    console.log(`Server Listening on port ${config.port}`)
});