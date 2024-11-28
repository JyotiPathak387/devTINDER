const express = require("express");

const app = express();

app.use("/user", 
    [

    (req,res, next) => {
        next();
      console.log("Handling the route handler 1")
     res.send("Response 1")
     
   }, 
   (req, res,next) => {
    console.log("Handling the route handler 2")
    next();
    res.send("Response 2")
   
   }  ],
   (req, res, next) => {
    console.log("Handling the route handler 3")
     next();
    res.send("Response 3")
    next()
   },
   (req, res, next) => {
    console.log("Handling the route handler 4")
    res.send("Response 4")
    next()
    },
    (req, res, next) => {
        console.log("Handling the route handler 5")
        res.send("Response 5")

        })

app.listen(7777, () => {
    console.log("listen port 7777");
})