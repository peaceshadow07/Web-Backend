const http = require("http");
const fs = require("fs");

const server = http.createServer((req,res)=>{
    console.log("browser to server");
    // res.setHeader("Contnt-Type","text/plain");
    // res.write("Hello World!!");
    let path = "./Views";
    switch(req.url){
        case "/":
            path += "/home.html";
            res.statusCode = 200;
            break;
        case "/about":
            path += "/about.html";
            res.statusCode = 200;
            break;
        case "/aboutUs":
            res.statusCode = 301;
            res.setHeader("Location","/about");
            res.end();
            break;
        default:
            path += "/404.html";
            res.statusCode = 404;
    }

    fs.readFile(path,(err,file)=>{
        if(err){
            res.end(err);

        }else{
            res.end(file);
        }
    })
})

server.listen(3000,"Localhost",()=>{
    console.log("Server is listening");
});