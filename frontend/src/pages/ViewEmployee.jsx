import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function ViewEmployee() {
  const navigate = useNavigate();
  const [empdata,setEmpdata]= useState([]);
  useEffect(()=>{
    fetch("http://localhost:7860/api/employee/showall")
    .then((res)=>res.json())
    .then((mydata)=>setEmpdata(mydata.data))
    .catch((err)=>{
      console.log("Error Fetching Data:"+err);
    })

  },[])
const editEmployee = (eid)=>{
  navigate(`/editemp/${eid}`);

}  

const displayEmployee= (eid)=>{
 
 navigate(`/displaytemp/${eid}`) 
}

const deleteEmployee= async(eid)=>{
   var condel= window.confirm("Are you sure To Delete Employee?");
    if(!condel)
    { return;}
    else
   try   
    {
      const response = await fetch("http://localhost:7860/api/emp/deletedata/" + eid,
        {method:"DELETE"});
      const data = await response.json();
      if(!response.ok)
      {
        throw new Error(data.message || "Failed To delete Record")
      }
      alert(data.message || "Employee Data Deleted Successfully")
     setEmpdata((prevEmps) => prevEmps.filter((empdata) => empdata.empid !== eid));
  } catch (error)
   {
    alert("Error: " + error.message);
  }
}

  return (
    <div>
      <h1> Employee Details</h1>
      <Link to="/createemp">Create New Employee</Link>
      <table border="2px" width="100%">
        <thead>
        <tr>
          <td>Empid</td>
          <td>EmpName</td>
          <td>Emailid</td>
          <td>Cellno</td>
          <td>Designation</td>
          <td>Salary</td>
          <td>Action</td>
        </tr>
        </thead>
        <tbody>
        {empdata.map((emp)=>
        <tr key={emp.empid}>
          <td>{emp.empid}</td>
          <td>{emp.empname}</td>
          <td>{emp.emailid}</td>
          <td>{emp.cellno}</td>
          <td>{emp.designation}</td>
          <td>{emp.salary}</td>
         <td>
           <button onClick={()=>editEmployee(emp.empid)}>Edit</button>&nbsp;&nbsp;
           <button onClick={()=>displayEmployee(emp.empid)}>Display</button>&nbsp;&nbsp;
            <button onClick={()=>deleteEmployee(emp.empid)}>Delete</button>&nbsp;&nbsp;           
          </td> 
        </tr>)
}     </tbody>
      </table>
    </div>
  )
}

export default ViewEmployee

