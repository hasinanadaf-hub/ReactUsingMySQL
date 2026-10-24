const  express= require("express")
const cors = require("cors");
const mysql = require("mysql2")
const bodyparser =require("body-parser")

const myserver = express();
myserver.use(cors());
myserver.use(bodyparser.json())
myserver.listen(7860,()=>{
    console.log("Server started at port 7860")
});

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root@1234",
    database:"hasina",
    port:3306
});

db.connect((err)=>{
    if(err)
    {
    console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});

myserver.get("/api/employee/showall",(req,res)=>{
    const sql = "SELECT * from employee";
    db.query(sql,(err,result)=>{
        if(err)
        {
            console.log("Not able to fetch data",err);
            res.send("Error Fetching Employee Data")
        }
        else
        {
            res.send({status:"Ok",data:result});
        }
    })
})

myserver.get("/api/employee/getempbyid/:id",(req,res)=>{
let sql = "Select * from employee where empid = "+req.params.id;
db.query(sql,(err,result)=>{
    if(err)
    {
          console.log("Not able to fetch data",err);
            res.send("Error Fetching Employee Data");
    }
    else
    {
        res.send({status:"Ok",data:result});
    }
})

})


myserver.post("/api/employee/saveemp",(req,res)=>{
    let empdetail ={
        empid:req.body.empid,
        empname:req.body.empname,
        emailid:req.body.emailid,
        cellno:req.body.cellno,
        designation:req.body.designation,
        salary :req.body.salary
    }
    let sql= "INSERT INTO employee SET ?";
    db.query(sql,empdetail,(error)=>{
        if(error)
        {
             res.send({status:false,message:"Employee Creation Failed"});
        }
        else
        {
            res.send({status:true,message:"Employee Registered Successfully"})
        }
    })
})


myserver.put("/api/emp/updatedata/:id",(req,res)=>
{
    var updquery = "UPDATE Employee SET empname='" 
    + req.body.empname  + "',emailid='" + req.body.emailid + "',cellno='"
    +req.body.cellno+"',designation='"+ req.body.designation + "',salary= "
    + req.body.salary + " WHERE empid = " +req.params.id;
    let query= db.query(updquery,(err,result)=>{
        if(err)
        {
            res.send({status:false,message:"Eployee Update Fail"})
        }
        else
        {
            res.send({status:true,message:"Employee Update Succeeded"})
        }
    })

})

myserver.delete("/api/emp/deletedata/:id",(req,res)=>{
  var delquery = "DELETE FROM employee Where empid = "+req.params.id;
  db.query(delquery,(err,result)=>{
        if(err)
        {
            res.send({status:false,message:"Eployee Delete Fail"})
        }
        else
        {
            res.send({status:true,message:"Employee Data Deleted Succeefully"})
        }
    
  })  
})