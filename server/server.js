const express = require("express")
const { connectDB , disconnectDB , isConnected} = require('./db.js')
const app = express()
const Router = require('./routes.js')
const PORT = 3000

app.use(cors({
    origin: ['https://studio-4dsojvxk6-shaazs-projects-888212a7.vercel.app/','http://localhost:5173'],
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type',
    credentials: true,
}))

const bodyParser = require('body-parser')

app.use(bodyParser.json({ limit: '100mb' }))
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }))

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