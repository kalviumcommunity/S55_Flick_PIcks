const express = require('express')
const router = express.Router()

router.use(express.json())

const userModel = require('./userSchema')

router.get('/users',async(req,res)=>{
    try{
        const test = await userModel.find({})
        res.send(test)
        console.log(test)
    }
    catch(err){
        console.log("USER ERROR",err)
    }
})

module.exports = router