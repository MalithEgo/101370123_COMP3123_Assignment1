const express = require('express');
const mongoose = require('mongoose');
const employeeRouter = require('./routes/EmployeeRoutes.js');
const userRouter = require('./routes/UserRoutes.js');
const bodyParser = require('body-parser');



const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json()); // Make sure it comes back as json


app.use(employeeRouter);
app.use(userRouter);

//TODO - Replace you Connection String here
mongoose.connect('mongodb+srv://vinz:dbs211@cluster0.bczaiju.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database.");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
  

app.listen(8081, () => { console.log('Server is running...') });