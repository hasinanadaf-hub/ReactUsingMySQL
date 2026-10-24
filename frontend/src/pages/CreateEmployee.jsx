import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateEmployee() {
  const navigate = useNavigate();

  const [empid, setEmpid] = useState("");
  const [empname, setEmpname] = useState("");
  const [emailid, setEmailid] = useState("");
  const [cellno, setCellno] = useState("");
  const [designation, setDesignation] = useState("");
  const [salary, setSalary] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const empdata = {
      empid,
      empname,
      emailid,
      cellno,
      designation,
      salary,
    };

    try {
      const response = await fetch(
        "http://localhost:7860/api/employee/saveemp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(empdata),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Employee Created Successfully");
        navigate("/");
      } else {
        alert(data.message || "Failed to Create Employee");
      }
    } catch (error) {
      console.error(error);
      alert("Error : " + error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Create Employee</h2>
      <hr />

      <form onSubmit={handleSubmit}>
        <div className="mb-3 row">
          <label htmlFor="empid" className="form-label col-lg-3">
            Employee ID
          </label>
          <input
            type="text"
            id="empid"
            className="form-control col-sm-5"
            placeholder="Enter Employee ID"
            value={empid}
            onChange={(e) => setEmpid(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="empname" className="form-label">
            Employee Name
          </label>
          <input
            type="text"
            id="empname"
            className="form-control"
            placeholder="Enter Employee Name"
            value={empname}
            onChange={(e) => setEmpname(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="emailid" className="form-label">
            Email ID
          </label>
          <input
            type="email"
            id="emailid"
            className="form-control"
            placeholder="Enter Email ID"
            value={emailid}
            onChange={(e) => setEmailid(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="cellno" className="form-label">
            Contact Number
          </label>
          <input
            type="text"
            id="cellno"
            className="form-control"
            placeholder="Enter Contact Number"
            value={cellno}
            onChange={(e) => setCellno(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="designation" className="form-label">
            Designation
          </label>
          <input
            type="text"
            id="designation"
            className="form-control"
            placeholder="Enter Designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="salary" className="form-label">
            Salary
          </label>
          <input
            type="number"
            id="salary"
            className="form-control"
            placeholder="Enter Salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Save Employee
        </button>
      </form>
    </div>
  );
}

export default CreateEmployee;