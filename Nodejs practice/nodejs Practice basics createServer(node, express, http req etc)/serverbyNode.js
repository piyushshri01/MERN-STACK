// http module require
const http = require("http")
const fs = require("fs")

// create server
const server = http.createServer((req, res)=> {
    console.log("request has been made from browser to server......");
    let filesPath = "./view"
    const url = req.url;
    switch(url){
        case "/":
            res.statusCode = 200;
            filesPath += "/home.html"
            break;
        case "/about":
            res.statusCode = 200;
            filesPath += "/about.html"
            break;
        // redirect routes
        case "/about-me":
            res.setHeader("Location","/about")
            res.statusCode = 301;
            res.end()
            break
        default:
            filesPath += "/404.html"
            res.statusCode = 404;
            break

    }
    res.setHeader('content-type', 'text/html')
    fs.readFile(filesPath,(err,FileData)=>{
        if (err){
            console.log();
        }
        else{
            res.write(FileData)
            res.end()
        }
    })
    
})

// listen server
server.listen(3000, 'localhost', ()=> {
    console.log("server is listening on port 3000 !!!");
})