import { useEffect, useState } from "react";
import axios from "axios";

const Employees = () => {
  const [employees, setEmployees] = useState([]);

  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");

  // Fetch Employees
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/employees"
      );

      setEmployees(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Add Employee
  const addEmployee = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/employees",
        {
          name,
          position,
          salary,
        }
      );

      setName("");
      setPosition("");
      setSalary("");

      fetchEmployees();
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Employee
  const deleteEmployee = async (id) => {
    console.log(id);

    try {
      await axios.delete(
        `http://localhost:5000/api/employees/${id}`
      );

      fetchEmployees();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="container">
      <h1>Employee Management System</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Employee Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />

        <input
          type="number"
          placeholder="Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />

        <button onClick={addEmployee}>
          Add Employee
        </button>
      </div>

      <hr />

      {employees.map((employee) => (
        <div
          key={employee._id}
          className="employee-card"
        >
          <h2>{employee.name}</h2>

          <p>{employee.position}</p>

          <p>₹ {employee.salary}</p>

          <button
            onClick={() =>
              deleteEmployee(employee._id)
            }
          >
            Delete
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
};

export default Employees;