const express = require("express");

const app = express();

const { adminAuth, userAuth} = require("./middlewares/auth");
app.use("/admin", adminAuth);
//app.use("/user",  userAuth);

app.get("/user", userAuth, (req,res) =>
{
    res.send("User Data");
})
app.get("/admin/getAllData", (req, res) => {
    //Logic of checking if the user is authorized
   res.send("All the data sent")
})

app.get("/admin/deleteUser", (req,res) => {
  res.send("Deleted user")
})

app.listen(7777, () => {
    console.log("listen port 7777");
})