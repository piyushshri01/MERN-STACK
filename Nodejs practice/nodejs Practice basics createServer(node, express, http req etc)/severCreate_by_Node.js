// http module require
const http = require("http")

// create server
const server = http.createServer((req, res)=> {
    console.log("request has been made from browser to server......");
    // console.log(req.method);
    // console.log(req.url);

    res.setHeader('content-type', 'text/plain')
    res.write("Hello World !!")
    res.end()
})

// listen server
server.listen(3000, 'localhost', ()=> {
    console.log("server is listening on port 3000 !!!");
})