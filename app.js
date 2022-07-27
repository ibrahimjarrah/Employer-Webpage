const express = require("express");
var cors = require('cors')
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const Employee = require("./models/employee");

app.use(cors()) // Use this after the variable declaration
// Connecting to DB
mongoose.connect("mongodb://localhost:27017/employees", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex:true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("database connected");
});

// IMPORTANT CONFIGURATION to accept json
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/employees", async (req, res) => {
  const employees = await Employee.find({});

  console.log("Successfully added got employees!!");

  res.send(employees);
});

app.get("/employees/:id", async (req, res) => {
  const { id } = req.params;

  const specialEmployee = await Employee.findById(id);

  const emp = {
    name: specialEmployee.firstName + " " + specialEmployee.lastName,
  };

  console.log("Successfully added got employee!!");

  res.send(emp);
});

app.post("/employees", async (req, res) => {
  const { body } = req;

  const nEmployee = new Employee(body);
  const newEmployee = await nEmployee.save();

  console.log("Successfully added new employee!!");

  res.send(newEmployee);
});

app.put("/employees/:id", async (req, res) => {
  const { body } = req;
  const { id } = req.params;

  await Employee.findByIdAndUpdate(id, body);

  console.log("Successfully updated employee!!");

  res.send("Updated");
});

app.delete("/employees/:id", async (req, res) => {
  const { id } = req.params;
  await Employee.findByIdAndDelete(id);

  console.log("Successfully deleted");

  res.send("Deleted");
});

//// BOOOKSSS----------------- title auther price

app.listen(5050, () => {
  console.log("Server running on port 5050");
});
