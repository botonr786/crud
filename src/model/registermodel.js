const mongoose=require("mongoose");
const bcryptjs=require("bcryptjs")

const RegisterSchema= new mongoose.Schema({
    first:{
        type:String,
        required:true
    },
    last:{
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
    },
    password:{
        type:String,
        required:true
    }
});
RegisterSchema.pre("save",async function(next){
  if(this.isModified("password")){
      this.password=await bcryptjs.hash(this.password,10);
  }
  next();
})
const registration=new mongoose.model("registration",RegisterSchema);
module.exports=registration;