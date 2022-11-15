const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('<h1>Hello World</h1>');
})
// send response
app.get('/about', function(req,res){
    res.sendFile("./Views/about.html",{root : __dirname});
})
// redirect
app.get('/aboutus', (req,res)=>{
    res.redirect("/about");
})
// 404 status code
app.use(function(req,res){
    res.status(404).sendFile("./Views/404.html", {root: __dirname});
})

app.listen(3000, ()=>{
    console.log("Server is listening . . . ");
})