const mongoose=require("mongoose");

const productschema=new mongoose.Schema({
    product:{
        type:String,
        required:true
    },
    details:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    gmail:{
        type:String,
        required:true
    },
    number:{
        type:String,
        required:true,
        unique:true
    }
});
const productdetails=new mongoose.model("productdetails",productschema);
module.exports=productdetails;