const express = require("express");

const app = express();


app.use("/hello", (req, res ) => {
    res.send("hello hello hello jyoti pathak");
   })

 
   
app.use("/test", (req, res ) => {
 res.send("hello from the server");
})


app.use("/", (req, res ) => {
    res.send("hello");
   })

app.listen(7777, () => {
    console.log("listen port 7777");
})