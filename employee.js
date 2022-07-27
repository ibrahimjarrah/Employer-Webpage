const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  firstName: String,
  lastName: String,
  age: Number,
  jobTitle: String,
});

module.exports = mongoose.model("Employee", EmployeeSchema);
