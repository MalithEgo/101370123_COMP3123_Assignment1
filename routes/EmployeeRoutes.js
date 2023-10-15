const express = require('express');
const employeeModel = require('../models/Employee');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.json());

//Read ALL
app.get('/api/emp/employees', async (req, res) => {
  const employees = await employeeModel.find({});
  
  try {
    res.send(employees);
    
  } catch (err) {
    res.status(500).send(err);
  }
});

//Create an employee
app.post('/api/emp/employee', async (req, res) => {
    const employee = new employeeModel(req.body);
    
    try {
      await employee.save();
      res.status(201).send({
        created_employee: employee
    })

    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.get('/api/emp/employees/:id', async(req, res) => {
    try {
        const employee = await employeeModel.findById(req.params.id, req.body)
        res.status(200).send({
          retrieved_employee: employee
      })
        
    } catch (err) {
        res.status(500).send({
            "status": false, "message": err.message
        })
    }
});

//Update Record
app.put('/api/emp/employee/:id', async (req, res) => {
  
    try {
      await employeeModel.findByIdAndUpdate(req.params.id, req.body)
      await employeeModel.save()
      res.send(employee)
      
    } catch (err) {
      res.status(500).send(err)
    }
  })

//Delete Record
//localhost:8081/employee/5d1f6c3e4b0b88fb1d257237
app.delete('/api/emp/employees/:id', async (req, res) => {
 

    try {
      const employee = await employeeModel.findByIdAndDelete(req.params.id)
      res.status(204).send({
        "status": true, deleted_employee: deletedEmployee
    })
      if (!employee) 
        res.status(404).send("No item found")
 
    } catch (err) {
      res.status(500).send(err)
    }
  })

module.exports = app