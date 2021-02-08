const {Schema, model} = require("mongoose")
//email validate
const validateEmail = function (email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};
// create schema
const AdminSchema = new Schema({
    name:{
        type:String,
        required:true,
        maxlength:50,
        trim:true

    },
    email:{
        type:String,
        unique:true,
        trim:true,
        lowercase:true,
        validate: [validateEmail, "Please provide a valid email address"]
    },
    role:{
        type:String,
        required:true,
        unique:true,
        default:"admin",
        enum:["admin","supper-admin"]
    },
    token:{
        type:String,
        default:null,
        trim:true
    }
})