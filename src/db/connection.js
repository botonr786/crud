const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/Crudoperation",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(()=>{
    console.log("Database connection successFull");
}).catch((err)=>{
    console.log("Database Coonection not SuccessFull");
})