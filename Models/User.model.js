const { connection } = require("../config/db")
const mongoose = require("mongoose")
const UserSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        zip: { type: String, required: true }
      }
}, {
    versionKey: false
})
const UserModel = mongoose.model("User", UserSchema)
module.exports = {
    UserModel
}