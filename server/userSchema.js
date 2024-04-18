const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name : String,
    username : String,
    password : String,
    watchlist : Array,
    liked : Array,
    watched : Array
})

const userModel = mongoose.model("user",userSchema)

module.exports = userModel