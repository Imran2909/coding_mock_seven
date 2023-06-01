const express = require("express")
const {RestModel} = require("../Models/Restorent.model")

const RestRouter = express.Router()
RestRouter.use(express.json())

RestRouter.post("/restaurant", async(req,res)=>{
    let data = req.body
    try {
        let sve= new RestModel(data)
        await sve.save()
        res.status(201).send(sve)
    } catch (error) {
        res.status(404).send(error)
    }
})

RestRouter.get("/restaurants/:id/menu", async(req,res)=>{
    // let data = req.body
    const userId = req.params.id;
    try {
        const data = await RestModel.find({"_id":userId})
        res.send(data[0].menu)
    } catch (error) {
        res.status(404).send(error)
    }
})
 

RestRouter.post("/restaurants/:id/menu", async(req,res)=>{
    let data = req.body
    const userId = req.params.id;
    try {
        const ress = await RestModel.find({"_id":userId})
        ress[0].menu.push(data)
        res.send(ress[0].menu)
    } 
    catch (error) {
        res.send(error)
    }
})
 
 

RestRouter.delete("/restaurants/:id/menu/:id", async(req,res)=>{
    let data = req.body
    const rid = req.params.id;
    res.send(rid)
    // try {
    //     const ress = await RestModel.find({"_id":userId})
    //     ress[0].menu.push(data)
    //     res.send(ress[0].menu)
    // } 
    // catch (error) {
    //     res.send(error)
    // }
})
 

RestRouter.get("/", async (req, res) => {
    const data = await RestModel.find()
    res.send(data)
})

//rest 64784e8200b592ef1a65f9db
//user 64784d3a600a972edd9efa1f


module.exports={
    RestRouter
}