const express = require("express");
const connectDB = require("./config/database")
const User = require("./models/user");
const app = express();

app.use(express.json());

 app.post("/signup", async (req, res) => { 
    const user = new User(req.body);
    
    try{ 
        await user.save();
        res.send("User added successfully");
    }
   catch(err){
    res.status(400).send("Error having the message " + err.message);
   }
});

//get the user by emailid
app.get("/user", async (req, res) => {
   const Useremail = req.body.emailId;

   try {
      const user = await User.find({emailId : Useremail});
      if(user.length === 0){
         res.status(400).send("User not found");
      }
      else { 
      res.send(user);}
   }
   catch(err){
      res.status(400).send("User not found");
   }
})

app.get("/feed", async(req, res) => {
   try{ 
   const user = await User.find({});
   res.send(user);
   }
   catch(err){
      res.status(500).send("user nto found");
   }
})

app.delete("/delete", async (req, res) => {
   const deleteUser = req.body._id;
 try{
   console.log("start")
   const user = await User.findByIdAndDelete({_id: deleteUser})
   console.log(user)
   res.send("User got deleted");
 }catch(err){
   res.status(404).send("User not present in the database");
 }
})

app.patch("/update", async (req,res) => {
   const userid = req.body._id;
   const data = req.body;
   try{
   const modified = await User.findByIdAndUpdate({_id: userid}, data , {returnDocument : 'after'})
   res.send(modified);
   }
   catch(err){
      res.status(404).send("user not present in the database");
      console.log(err)
   }
})

connectDB()
.then(() => {
   console.log("databse connected successfully");
   app.listen(7777, () => {
    console.log("listen port 7777");
});
})
.catch((err) => {
   console.error("databse not connected");
   console.log(err);
});

console.log("Hello form teh end for the line");


