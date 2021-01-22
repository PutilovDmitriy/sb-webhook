const http = require('http');
const fs = require('fs');

const hostname = 'sasik-fail.herokuapp.com';
const port = process.env.PORT || 5000;

const getFilePath = (path) => {
    if (path === '/') {
        return 'client/index.html';
    }
    return `client${path}`
}

let date = new Date();

const server = http.createServer((req, res) => {
    console.log(req)
    if (req.url.includes('api')) {
        res.statusCode = 200;
        if (req.url === '/api/changeDate') {
            date = new Date();
        }
        res.end(JSON.stringify({date}))
    } else {
        const filePath = getFilePath(req.url);
        fs.readFile(filePath, (err, data) => {
            // если произошла ошибка - отправляем статусный код 404
            if(err){
                res.statusCode = 404;
                res.end("Resourse not found!");
            }
            else{
                res.end(data);
            }
        });
    }
});

server.listen(port, () => {
    console.log(`Server running at https://${hostname}/`);
});
