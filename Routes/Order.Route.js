const express = require("express")
const {OrderModel} = require("../Models/Order.model")

const OrderRouter = express.Router()
OrderRouter.use(express.json())

OrderRouter.post("/", async(req,res)=>{
    let {user,restaurant,items,deliveryAddress} = req.body
    let val=`${items[0].price * items[0].quantity }`
    console.log(val)
    try {
        let sve= new OrderModel({user,restaurant,items,totalPrice:val,deliveryAddress,status:"preparing"})
        await sve.save()
        res.status(201).send(sve)
    } catch (error) {
        res.status(404).send(error)
    }
})

OrderRouter.get("/:id", async(req,res)=>{
    let ID= req.params.id
    try {
        const data = await  OrderModel.find({"_id":ID})
        res.send(data)
    } catch (error) {
        res.status(404).send(error)
    }
})

OrderRouter.patch("/:id", async(req,res)=>{
    let ID= req.params.id
    let asd= req.body.status
    try {
        const data = await  OrderModel.find({"_id":ID})
        let {deliveryAddress,user,restaurant,items,totalPrice,status} = data[0]
        const data1 = await  OrderModel.findByIdAndUpdate({"_id":ID},{
            deliveryAddress,user,restaurant,items,totalPrice,status : asd
        })
        res.send("Status updated successfully")

    } catch (error) {
        res.status(404).send(error)
    }
})

OrderRouter.get("/", async(req,res)=>{
    let ID= req.params.id
    try {
        const data = await  OrderModel.find()
        res.send(data)
    } catch (error) {
        res.status(404).send(error)
    }
})
//64784bafe0b0895b1399d69e




module.exports={
    OrderRouter
}