const express = require("express")
const { connectDB , disconnectDB , isConnected} = require('./db.js')
const app = express()
const Router = require('./routes.js')
const PORT = 3000

const cors = require('cors')

const printStatus = async() => {
    await connectDB()
    console.log("MongoDB Connection Status -> ",isConnected())
}

printStatus()

app.get('/',(req,res)=>{
    res.send("HELLO WORLD")
    console.log("working")
})

app.use(cors())
app.use(Router)

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
})