import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditEmployee() {
  const { eid } = useParams();
  const navigate = useNavigate();

  const [empname, setEmpname] = useState("");
  const [emailid, setEmailid] = useState("");
  const [cellno, setCellno] = useState("");
  const [designation, setDesignation] = useState("");
  const [salary, setSalary] = useState("");

  useEffect(() => {
    fetch(`http://localhost:7860/api/employee/getempbyid/${eid}`)
      .then((res) => res.json())
      .then((result) => {
        console.log("Fetched employee:", result);

        const data = result.data[0];

        setEmpname(data.empname || "");
        setEmailid(data.emailid || "");
        setCellno(data.cellno || "");
        setDesignation(data.designation || "");
        setSalary(data.salary || "");
      })
      .catch((err) => {
        console.error("Error fetching employee:", err);
      });
  }, [eid]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const edata = {
      eid,
      empname,
      emailid,
      cellno,
      designation,
      salary
    };

    try {
      const response = await fetch(
        `http://localhost:7860/api/emp/updatedata/${eid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(edata),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Employee Updated Successfully");
        navigate("/");
      } else {
        alert(data.message || "Failed to update employee.");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div>
      <h2>Edit Employee</h2>
      <hr />

      <form onSubmit={handleSubmit}>
        <div className="row">
          <label>Employee Id:</label>
          <input type="text" value={eid} readOnly />
        </div>

        <div className="row">
          <label>Employee Name:</label>
          <input
            type="text"
            value={empname}
            onChange={(e) => setEmpname(e.target.value)}
          />
        </div>

        <div className="row">
          <label>Email Id:</label>
          <input
            type="email"
            value={emailid}
            onChange={(e) => setEmailid(e.target.value)}
          />
        </div>

        <div className="row">
          <label>Contact No:</label>
          <input
            type="text"
            value={cellno}
            onChange={(e) => setCellno(e.target.value)}
          />
        </div>

        <div className="row">
          <label>Designation:</label>
          <input
            type="text"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
          />
        </div>

        <div className="row">
          <label>Salary:</label>
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </div>

        <div className="row">
          <button type="submit">Update Employee</button>
        </div>
      </form>

      <hr />
    </div>
  );
}

export default EditEmployee;