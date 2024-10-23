const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    first_name:String,
    last_name:String,
    email:{
        type:String,
        require:true,
        unique:true,
    },
    age:Number,
    password:String,
    rol:{
        type:String,
        enum: ["admin", "user"],
        default: "user"
    }
})

const UserModel = mongoose.model("usuarios", userSchema);

module.exports = UserModel;