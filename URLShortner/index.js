const express = require("express");

const shortUrl = require("./routes/url");
const homeRoutes = require("./routes/home");
const testRoute = require("./routes/testDb");

const app = express();
const PORT = 1337;

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended : false }));   

app.use("/urlapi", shortUrl);
app.use("/", homeRoutes);


app.listen(PORT, ()=>{
    console.log("App is listening to the port : " + PORT);
});

