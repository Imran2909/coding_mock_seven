const express = require("express")
const bcrypt = require("bcrypt")
const connection = require("../config/db")
const { UserModel } = require("../Models/User.model")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const UserRouter = express.Router()
UserRouter.use(express.json())

UserRouter.post("/register", (req, res) => {
    let { name, email, password,address } = req.body
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                res.send(err)
            }
            else {
                const data = new UserModel({ name, email, password: hash, address })
                await data.save()
                res.status(201).send(data)
            }
        })
    } catch (error) {
        res, send(error)
    }
})

UserRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    let userAvail = await UserModel.find({ email })
    console.log(userAvail)
    if (userAvail.length > 0) {
        try {
            bcrypt.compare(password, userAvail[0].password, async (err, result) => {
                let token = jwt.sign({ UserId: userAvail[0]._id }, process.env.secretKey)
                res.status(201).send({ "msg": "Login Successfull", token })
            })
        } catch (error) {
            res.send(error)
        }
    }
    else {
        res.status(404).send("User not found  , Please Signup first")
    }
})

UserRouter.get("/", async (req, res) => {
    const data = await UserModel.find()
    res.send(data)
})

module.exports = {
    UserRouter
}