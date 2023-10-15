const express = require('express')
const userModel = require('../models/User');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.post('/api/user/signup', async (req, res) => {
    const newUser = new userModel(req.body)

    try {
        await newUser.save()

        res.status(201).send({
            created_user: newUser
        })

    } catch (err) {
        res.status(500).send({
            "status": false, "message": err.message
        })
    }
});

app.post('/api/user/login', async (req, res) => {
    try {
        userModel.findOne({username: req.body.username}, (err, user) => {
            if (err) throw err

            if (user == null) {
                res.status(500).send({
                    "status": false, "message": "Cannot verify credentials with that username and password."
                })

            }

         else {
            user.verifyPassword(req.body.password, (err, isMatch) => {
                if (err) throw err
                if (isMatch) {
                    res.status(200).send({
                        "status": true, "username": req.body.username, "message": "User logged in successfully."
                    })
                } else {
                    res.status(500).send({
                        "status": false, "message": "Cannot verify credentials with that username and password."
                    })
                }
            })
        }
        
            
        })


        
    } catch (err) {
        res.status(500).send({
            "status": false, "message": err.message
        })
    }
});


module.exports = app