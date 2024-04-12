const express = require('express')
const router = express.Router()

router.use(express.json())

const userModel = require('./userSchema')
const movieModel = require('./moviesSchema')

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

router.post('/login',async(req,res)=>{
    try{
        const {username , password} = req.body
        const user = await userModel.findOne({username , password})
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        } else {
            console.log(user);
            return res.status(200).json({ success: true, message: 'Login successful' });
        }
    }
    catch(err){
        console.log(err)
    }
})

router.post('/newUser',async(req,res)=>{
    try{
        const data = await userModel.create(req.body)
        console.log(data)
        res.send(data)
    }
    catch(err){
        console.log(err)
    }
})

router.post('/userExists',async(req,res)=>{
    try{
        console.log("REQ BODY",req.body)
        const user = await userModel.findOne({"username":req.body.username})
        if (!user) {
            return res.status(200).json({ error: 'No Username Exists' });
        } else {
            console.log(user);
            return res.status(201).json({ success: true, message: 'username Exists' });
        }
    }
    catch(err){
        console.log(err)
    }
})

router.post('/addToWatchlist/:username', async(req,res) => {
    const {username} = req.params
    const movie = req.body

    const user = await userModel.findOne({username})
    const isMoviePresent = user.watchlist.find(item => item.id == movie.id)
    if(isMoviePresent){
        const newWatchlist = user.watchlist.filter(item => item.id != movie.id)
        user.watchlist = newWatchlist
        await user.save()
        return res.status(201).json({"Status":"Movie removed"})
    }
    else{
        try{
            user.watchlist.push(movie)
            await user.save()
            res.status(200).json(movie)
        }
        catch(err){
            console.log(err)
        }
    }
})

router.post('/addToLiked/:username', async(req,res) => {
    const {username} = req.params
    const movie = req.body

    const user = await userModel.findOne({username})
    const isMoviePresent = user.liked.find(item => item.id == movie.id)
    if(isMoviePresent){
        const newliked = user.liked.filter(item => item.id != movie.id)
        user.liked = newliked
        await user.save()
        return res.status(201).json({"Status":"Movie removed"})
    }
    else{
        try{
            user.liked.push(movie)
            await user.save()
            res.status(200).json(movie)
        }
        catch(err){
            console.log(err)
        }
    }
})

router.get('/movies',async(req,res)=>{
    try{
        const test = await movieModel.find({})
        res.send(test)
        console.log(test)
    }
    catch(err){
        console.log("USER ERROR",err)
    }
})

router.post('/add',async(req,res) => {
    try{
        const user = await movieModel.findOne({"user":"admin"})

        // user.sports.push(req.body)
        
        // user.random.push(req.body)
        user.sports.map(el => console.log(el.title))
        await user.save()
        res.status(200).json(req.body)
    }
    catch(err){
        console.log(err)
    }
})

module.exports = router