const express = require("express");
const router = express.Router();
const nanoid  = import("nanoid");
const { v4: uuidv4 } = require('uuid');
const connectDB = require("../config/connection");
const URL = require("../models/urlModel");

const Base = "http://localhost:1337/urlapi";


// post api call
router.post("/", async (req, res)=>{
    try {
        const {longUrl} = req.body;
        // ID for long url 
        const shortId = uuidv4();

        const client = await connectDB();
        await client.connect();
        const resultID = await client.db("URLShortner").collection("urls").insertOne({
            longUrl,
            shortId   
        })

        // console.log(resultID);

        return res.status(200).json({
            status: "OK",
            shortUrl : `${Base}/${shortId}`
        })


    } catch (error) {
        console.log(error);
    }

});


router.get("/:short", async(req, res)=>{
    
    const shortID = req.params.short;
    // console.log(shortID);
    try {
        const client = await connectDB();
        await client.connect();
        const result = await client.db("URLShortner").collection("urls").findOne({shortId : shortID});
        // console.log(result);    
        if(!result){
            return res.send("Invalid URL");
        }
        return res.redirect(result.longUrl);
    }catch (error) {
        // console.log(error);
        return res.status(500).send(error);
    }
});

module.exports = router;