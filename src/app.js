const express = require("express");

const app = express();

app.get("/getUserData", (req,res) =>
{ 
    try{ 
        throw new Error("jdkschjsdk")
        res.send("User Data sent")
    }
    catch(err){
        res.status(500).send("something went wrong !!!");
    }
   
})

app.use("/", (err, req, res, next) => {
    if(err){
        res.status(500).send("something went wrong");
    }
})

app.listen(7777, () => {
    console.log("listen port 7777");
})