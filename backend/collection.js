const express=require("express");
const app=express();
//import morgan from "morgan";


app.use(express.json());
//app.use(morgan("common"));

function validate(req,res,next){
    var{id,name,password}=req.body;
    if(!id||!name||!password){
        return res.send("we need all data");
    }
    next();
}


app.post("/insert", validate,(req,res)=>{
    const {id,name,password}=req.body;
    console.log(id,name,password );
    res.status(200).send("okay kennedy hey klv");
})




app.listen(3000, ()=>{
    console.log("server is running");
})