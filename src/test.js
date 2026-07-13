import http from "http";

http.createServer((req, res) => {
    res.end("Hello");
}).listen(3000);