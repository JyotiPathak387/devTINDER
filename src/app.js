const express = require("express");
const connectDB = require("./config/database")
const User = require("./models/user");


const app = express();

app.post("/signup", async (req, res) => {
    const user = new User({
       firstName: "Divya",
       lastName: "Mishra",
       emailId: "Divya@mishra.com",
       password: "divya@1232"
    });

    try{ 
        await user.save();
        res.send("User added successfully");
    }
   catch(err){
    res.status(400).send("Error having the message " + err.message);
   }
});


connectDB()
.then(() => {
   console.log("databse connected successfully");
   app.listen(7777, () => {
    console.log("listen port 7777");
});
})
.catch((err) => {
   console.error("databse not connected");
});




