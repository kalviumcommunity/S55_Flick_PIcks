const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name : String,
    username : String,
    password : String,
    profilePic : String,
    watchlist : Array,
    liked : Array,
    watched : Array,
    bio : String,
    favourites : {
        movies : Array,
        actors : Array,
        directors : Array,
    },
    backdrop : Object
})

const userModel = mongoose.model("user",userSchema)

module.exports = userModel