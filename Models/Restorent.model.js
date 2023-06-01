const { connection } = require("../config/db")
const mongoose = require("mongoose")

const RestSchema = mongoose.Schema({
    name: { type: String, required: true },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        zip: { type: String, required: true }
      },
      menu:[
        {
            name: { type: String, required: true },
            description: { type: String, required: true },
            price: { type: Number, required: true },
            image: { type: String, required: true }
        }
      ]
}, {
    versionKey: false
})

const RestModel = mongoose.model("Restaurant", RestSchema)
module.exports = {
    RestModel
}