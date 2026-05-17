const express = require("express");

const router = express.Router();

const Employee = require("../models/Employee");

// GET employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();

    res.json(employees);
  } catch (error) {
    res.status(500).json(error);
  }
});

// ADD employee
router.post("/", async (req, res) => {
  try {
    const employee = new Employee({
      name: req.body.name,
      position: req.body.position,
      salary: req.body.salary,
    });

    const savedEmployee = await employee.save();

    res.json(savedEmployee);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE employee
router.delete("/:id", async (req, res) => {
  try {
    const deletedEmployee =
      await Employee.findByIdAndDelete(
        req.params.id
      );

    if (!deletedEmployee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.json({
      message: "Employee deleted successfully",
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;