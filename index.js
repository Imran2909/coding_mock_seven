const express = require("express")
const { UserRouter } = require("./Routes/User.Route")
const { RestRouter } = require("./Routes/Restaurant.Route")
const { OrderRouter } = require("./Routes/Order.Route")
const { UserModel } = require("./Models/User.model")
const bcrypt = require("bcrypt")
const connection = require("./config/db")
const { Authenticate } = require("./Middleware/Authenticate")
const app = express()
app.use(express.json())
require("dotenv").config()

app.get("/", (req, res) => {
    res.send("Home.")
})

app.use("/user", UserRouter)

app.post("/user/:id/reset",async(req,res)=>{
    const userId = req.params.id;
    
    let {currentPass,newPass} = req.body
    try {
        const data = await UserModel.find({"_id":userId})
        let {address,_id,name,email,password}= data[0]
        
        bcrypt.compare(currentPass, data[0].password, async (err, result) => {
            if(result==false){
                res.send("Incorrect current password")
            }
            else{
                bcrypt.hash(newPass, 5, async (err, hash) => {
                    if (err) {
                        res.send(err)
                    }
                    else {
                        // hashedPass=hash
                      let updted=  await UserModel.findByIdAndUpdate({ _id: userId }, {
                            address,_id,name,email,password:hash
                        })
                        res.send("Password updated successfully ")
                    }
                })
            }
        })
        
    } catch (error) {
        res.status(204).send(error)
    }

})

app.use(Authenticate)
app.use("/restr",RestRouter)
app.use("/orders",OrderRouter)

app.listen(4500, () => {
    console.log("Server start at 4500")
})