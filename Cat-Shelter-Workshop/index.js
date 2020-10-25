const config = require('./config.json');
const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const qs = require('querystring');

const VIEWS_PATH = path.resolve(config.viewsDir);

function content(data, type = 'text/plain') {
    return {
        'Content-Length': Buffer.byteLength(data),
        'Content-Type': type
    }
}

const routerMap = {
    '/': '/home/index.html',
    '/addBreed': '/addBreed.html',
    '/addCat': '/addCat.html',
};

const mimeTypeMap = {
    'html': 'text/html',
    'css': 'text/css',
    'js': 'application/javascript',
    'json': 'application/json',
    'ico': 'image/vnd.microsoft.icon'
}

function sendFile(res, fullFilePath) {
    const fileExt = path.extname(fullFilePath);
    const type = mimeTypeMap[fileExt.slice(1)];
    fs.readFile(fullFilePath, function (err, data) {
        if (err) {
            const {message} = err
            res.writeHead(500, content(message)).end(message);
            return;
        }
        res.writeHead(200, content(data, type)).end(data);
    })
}

function httpHandler(req, res) {
    const pathName = url.parse(req.url).pathname;
    const fileRelativePath = routerMap[pathName];
    const method = req.method.toLocaleUpperCase();

    if (method === 'GET') {
        if (pathName.slice(1) === "addCat"){
            const breeds ={"1":"Bombay Cat","2":"Fluffy Cat"} ;
        }
        if (pathName.includes(config.staticFileDir)|| pathName.slice(1) ==='database.json') {
            const fullStaticFilePath = path.resolve(pathName.slice(1));
            sendFile(res, fullStaticFilePath)
            return;
        }

        if (!fileRelativePath) {
            const message = 'Not Found'
            res.writeHead(404, content(message)).end(message);
            return;
        }

        const fullFilePath = path.join(VIEWS_PATH, fileRelativePath);
        sendFile(res, fullFilePath)
    } else if (method === 'POST') {
        let body = '';
        req.on('data', function (data) {
            body += data;
            if (body.length > 1e6)
                req.connection.destroy();
        });
        req.on('end', function () {
            let post = JSON.parse(JSON.stringify(qs.parse(body)));
            eval(`utils.` + pathName.slice(1) + '(post)')
        });
        res.writeHead(301, {Location: '/addCat'});
        res.end();
    }
}

http.createServer(httpHandler).listen(config.port, function () {
    console.log(`Server Listening on port ${config.port}`)
});
