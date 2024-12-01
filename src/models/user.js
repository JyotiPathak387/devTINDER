
const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50,
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email" + value);

            }
        }
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        min: 18,
        validator(password){
            if(!validator.isStrongPassword(password)){
                throw new Error("Enter a Strong password");
            }
        }
    },
    gender: {
        type: String,
        validate(value){
            if(!["male", "female", "other"].includes(value)){
                throw new Error("Gender is not valid")
            }
        }
    },
    photoUrl: {
        type: String,
        default: "https://th.bing.com/th?id=OIP.Y04Jkg_VJQLs-PV7Itca-QHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
    },
    about: {
        type: String,
        default: "This is the default description of the user",
    },
    skills: {
        type: [String],
    }},{
        timestamps: true,
    },
);

module.exports = mongoose.model("User", userSchema);

