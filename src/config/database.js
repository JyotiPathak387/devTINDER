const mongoose = require("mongoose");

const connectDB = async() => {
 await mongoose.connect(
    "mongodb+srv://jyotipathak:jyoti%40pathak@cluster0.1ep6y.mongodb.net/devTinder"
);
};


module.exports = connectDB;


