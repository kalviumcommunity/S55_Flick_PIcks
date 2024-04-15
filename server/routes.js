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

// router.post('/add',async(req,res) => {
//     try{
//         const user = await movieModel.findOne({"user":"admin"})

//         user.random = user.unique

//         await user.save()
//         console.log(user.unique.length)
//         res.status(200).json(req.body)
//     }
//     catch(err){
//         console.log(err)
//     }
// })

router.post('/isInWatchlist/:username', async(req,res) => {
    const {username} = req.params
    const movie = req.body

    const user = await userModel.findOne({username})
    const isMoviePresent = user.watchlist.find(item => item.id === movie.id)

    if(isMoviePresent){
        return res.status(200).json("Movie is in Watchlist")
    }
    else{
        return res.status(201).json("Movie is not in Watchlist")
    }
})

router.post('/isInLiked/:username', async(req,res) => {
    const {username} = req.params
    const movie = req.body

    const user = await userModel.findOne({username})
    const isMoviePresent = user.liked.find(item => item.id === movie.id)
    
    if(isMoviePresent){
        return res.status(200).json("Movie is in Liked")
    }
    else{
        return res.status(201).json("Movie is not in Liked")
    }
})

module.exports = router