const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.ObjectId
const bcrypt = require("bcrypt");
const jwt= require("jsonwebtoken")


const userSchema = new Schema({
    fullname : {
        firstname :{
            type : String, 
            required : true,
            minlength : [3, 'first name must be at least 3 characters long'],

         },
         lastname :{
            type : String,
            minlength : [3, 'lastname must be at least 3 characters long'],
            
         }
    }, 
    email : {
        type : String ,
        unique : true, 
        required : true , 
        minlength: [5, 'email must be atleast 5 char long']
    }, 
    password : {
        type :String, 
        required : true,
        select : false
    },

    sockedId : {
        type : String,

    }
})

userSchema.methods.generateAuthToken = function (){
    const token = jwt.sign({_id : this._id}, process.env.JWT_SECRET)
    return token;
};



userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.statics.hashpassword = async function (password){
    return await bcrypt.hash(password, 10);
}

const userModel = mongoose.model('user', userSchema);

module.exports  = userModel