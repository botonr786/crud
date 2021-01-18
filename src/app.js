const express=require("express");
const app=express();
const port=process.env.PORT || 3000;
const path=require("path");
const hbs=require("hbs");
const connection=require("./db/connection");
const registration=require("./model/registermodel");
const productmodel=require("./model/productmodel");
const bcryptjs=require("bcryptjs");
const Math=require("mathjs");



const public_static=path.join(__dirname,"../public")
app.set("views",path.join(__dirname,"../templets/views"));
const partial_static=path.join(__dirname,"../templets/partial");
app.set("view engine","hbs");
hbs.registerPartials(partial_static);
app.use(express.static(public_static));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/",async(req,res)=>{
    res.render("index");
})

//get register
app.get("/register",async(req,res)=>{
    try{
        res.render("register");
    }catch(err){
        res.send("not get register page");
    }
})
app.post("/register",async(req,res)=>{
    try{
        const password=req.body.password;
        const conpass=req.body.password;
        if(password===conpass){
            const insert=new registration({
                first:req.body.first,
                last:req.body.last,
                gmail:req.body.gmail,
                number:req.body.number,
                password:req.body.password
            });
    
            const savedata=await insert.save();
            res.render("login");

        }
    }catch(err){
        res.send("not insert")
    }
})
//login page get
app.get("/login",async(req,res)=>{
    try{
        res.render("login");
    }catch(err){
        res.send("not get login page");
    }
})
app.post("/login",async(req,res)=>{
    try{
    const gmail=req.body.gmail;
    const password=req.body.password;

    const gmailmatch=await registration.findOne({gmail:gmail});
    const passwordmatch=bcryptjs.compare(password,gmailmatch.password,(err,data)=>{
        if(err) throw err;
        if(data){
            res.render("product");
        }else{
            res.send("password not matching")
        }
    });

    }catch(err){
        res.send("not login");
    }
})
//product get
app.get("/product",async(req,res)=>{
    try{
        res.render("product");
    }catch(err){
        res.send("not get product page")
    }
});
app.post("/product",async(req,res)=>{
    try{
       const productinsert=new productmodel({
        product:req.body.product,
        details:req.body.details,
        price:req.body.price,
        gmail:req.body.gmail,
        number:req.body.number
       });
       const savedata=await productinsert.save();
       res.render("product");
    }catch(err){
        res.send("not insert")
    }
})

//product dispaly
app.get("/display",async(req,res)=>{
    try{
        productmodel.find((err,data)=>{
            
            if(!err){
                res.render("display",{
                    productmodel:data
                })
            }
        })
       
    }catch(err){
        res.send("not display");
    }
})
//edit page
app.get("/edit/:id",async(req,res)=>{
    try{
        const _id=req.params.id;
        productmodel.findById(_id,(err,data)=>{
            if(!err){
                res.render("edit",{
                    productmodel:data
                })
            }
        })
    }catch(err){
        res.send("not edit get")
    }
})
app.post("/edit",async(req,res)=>{
    try{
         const update=await productmodel.findByIdAndUpdate(req.body.id,{
            product:req.body.product,
            details:req.body.details,
            price:req.body.price,
            gmail:req.body.gmail,
            number:req.body.number
         });
         const database=await update.save((err,data)=>{
             if(!err){
                 res.render("product");
             }else{
                 res.send("error")
             }
         });
    }catch(err){
        res.send("not update")
    }
})
//deleted 
app.get("/:id",async(req,res)=>{
    try{
      const _id=req.params.id;
      const deleted=await productmodel.findByIdAndDelete(_id,(err,data)=>{
          if(!err){
            // res.render("display");
          }
      })
    }catch(err){
        res.send("not deletred")
    }
});



app.listen(port,()=>{
   console.log("server is running");
})