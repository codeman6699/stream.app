const express=require("express");
const app=express();
const cors=require("cors");
const mysql=require("mysql2");
app.use(cors());
app.use(express.json());

const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'groupb'
})

app.post("/insertstudent",(req,res)=>{

    const{name,email,trade}=req.body;
    console.log(email);
   connection.query("INSERT INTO students(name,email,trade)VALUES(?,?,?)",[name,email,trade],
        (err,result)=>{
        if(err){
            res.send("failed to insert",err);
            console.log("failed",err);
        }
        else{
            res.send("well inserted")
        }
    })

});
app.get("/retrieve",(req,res)=>{
    connection.query("SELECT*FROM students",
        (err,result)=>{
            if(err){
                res.send("failed to select")
            }
            else{
                res.send(result)

            }
        }
    )

});
app.get("/retrieve/:id",(req,res)=>{
    const{id}=req.params
    connection.query("SELECT*FROM students WHERE id=?",[id],
        (err,result)=>{
            if(err){
                res.send("failed to select")
            }
            else{
                res.send(result[0])

            }
        }

    )



});
app.put("/update/:id",(req,res)=>{
    const {name,email,trade} = req.body;
    const{id} = req.params;
    connection.query("UPDATE students SET name=?,email=?,trade=? WHERE id=?",[name,email,trade,id],(err,result)=>{
        if(err){
            res.send("failed to update",err);
            console.log("hi",err)
        }
        else{
            res.send("well updated")
        }
    })
});

app.listen(3000,()=>{
    console.log("server is on")
});
