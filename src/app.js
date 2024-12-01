const express = require("express");
const connectDB = require("./config/database")
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const app = express();

app.use(express.json());

 app.post("/signup", async (req, res) => { 

    try{ 
      //Validation of data
      validateSignUpData(req);
      //Encrypt the password

      const {firstName, lastName, emailId, password} = req.body;
      // const {firstName} = req.body;
       //console.log(firstName)
      const psswordhash = await bcrypt.hash(password, 10);
      const user = new User({
         firstName, 
         lastName, 
         emailId, 
         password: psswordhash,
      });
  
        await user.save();
        res.send("User added successfully");
    }
   catch(err){
    res.status(400).send("ERROR   " + err.message);
    console.log(err)
   }
});

app.post("/login", async (req, res) => {
   try{ 
   const {emailId , password } = req.body;
   const user = await User.findOne({emailId : emailId})
  // console.log(user)
   if(!user){
      throw new Error("User doesn't exists");
   }

   const isPasswordValid = await bcrypt.compare(password, user.password);

   if(isPasswordValid){

     res.send("Login Successfull");
   }
   else {
      throw new Error("Password is not correct");
   }
 }catch(err)
   {
      res.status(400).send("ERROR" + err.message);
   }
})
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

app.patch("/update/:userid", async (req,res) => {
   const userid = req.params?.userid;
   const data = req.body;

   try{
      const ALLOWED_UPDATES = [
         
         "photoUrl", 
         "about",
         "gender",
         "age",
         "skills",
      ];
   
      const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));
   
      if(!isUpdateAllowed){
         throw new Error("Update not allowed");
      }
      if(data?.skills.length > 10){
         throw new Error("Skill cannot be more than 10");
      }

   const modified = await User.findByIdAndUpdate({_id: userid}, data , {returnDocument : 'after', runValidators: true,})
   res.send("User updated succesfully");
   }
   catch(err){
      res.status(400).send("UPDATE FAILED" + err.message);
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




