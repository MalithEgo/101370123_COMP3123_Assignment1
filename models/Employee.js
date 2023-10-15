const mongoose = require('mongodb');
const options = ["male", "female", "other"]

const EmployeeSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    maxLength:100
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    maxLength: 50
  },

  email: {
    type: String,
    maxLength: 50,
    unique: true
  },
  
  gender: {
    type: String,
    maxLength: 25,
    lowercase: true,
    validate(value) {
      if (!options.includes(value)) throw new Error("You can only choose male, female, or other for gender.")
  }
  },

  salary: {
    type: Number,
    default: 0.0,
    validate(value) {
      if (value < 0.0) throw new Error("Negative Salary aren't real.");
    }
  }
});

const Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;