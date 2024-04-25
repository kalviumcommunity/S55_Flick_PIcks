const express = require('express')
const router = express.Router()

router.use(express.json())

const userModel = require('./userSchema')
const movieModel = require('./moviesSchema')

router.get('/users', async (req, res) => {
    try {
        const test = await userModel.find({})
        res.send(test)
        console.log(test)
    }
    catch (err) {
        console.log("USER ERROR", err)
    }
})

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await userModel.findOne({ username, password })
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        } else {
            return res.status(200).json({ success: true, message: 'Login successful' });
        }
    }
    catch (err) {
        console.log(err)
    }
})

router.post('/newUser', async (req, res) => {
    try {
        const data = await userModel.create(req.body)
        console.log(data)
        res.send(data)
    }
    catch (err) {
        console.log(err)
    }
})

router.post('/userExists', async (req, res) => {
    try {
        console.log("REQ BODY", req.body)
        const user = await userModel.findOne({ "username": req.body.username })
        if (!user) {
            return res.status(200).json({ error: 'No Username Exists' });
        } else {
            console.log(user);
            return res.status(201).json({ success: true, message: 'username Exists' });
        }
    }
    catch (err) {
        console.log(err)
    }
})

router.post('/addToWatchlist/:username', async (req, res) => {
    const { username } = req.params
    const movie = req.body

    const user = await userModel.findOne({ username })
    const isMoviePresent = user.watchlist.find(item => item.id == movie.id)
    if (isMoviePresent) {
        const newWatchlist = user.watchlist.filter(item => item.id != movie.id)
        user.watchlist = newWatchlist
        await user.save()
        return res.status(201).json({ "Status": "Movie removed" })
    }
    else {
        try {
            user.watchlist.push(movie)
            await user.save()
            res.status(200).json(movie)
        }
        catch (err) {
            console.log(err)
        }
    }
})

router.post('/addToLiked/:username', async (req, res) => {
    const { username } = req.params
    const movie = req.body

    const user = await userModel.findOne({ username })
    const isMoviePresent = user.liked.find(item => item.id == movie.id)
    if (isMoviePresent) {
        const newliked = user.liked.filter(item => item.id != movie.id)
        user.liked = newliked
        await user.save()
        return res.status(201).json({ "Status": "Movie removed" })
    }
    else {
        try {
            user.liked.push(movie)
            await user.save()
            res.status(200).json(movie)
        }
        catch (err) {
            console.log(err)
        }
    }
})

router.post('/addToWatched/:username', async (req, res) => {
    const { username } = req.params
    const movie = req.body

    const user = await userModel.findOne({ username })
    const isMoviePresent = user.watched.find(item => item.id == movie.id)
    if (isMoviePresent) {
        const newwatched = user.watched.filter(item => item.id != movie.id)
        user.watched = newwatched
        await user.save()
        cnsole.log(user.watched)
        return res.status(201).json({ "Status": "Movie removed" })
    }
    else {
        try {
            user.watched.push(movie)
            await user.save()
            res.status(200).json(movie)
        }
        catch (err) {
            console.log(err)
        }
    }
})

router.get('/movies', async (req, res) => {
    try {
        const test = await movieModel.find({})
        res.send(test)
        console.log(test)
    }
    catch (err) {
        console.log("USER ERROR", err)
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

router.post('/isInWatchlist/:username', async (req, res) => {
    const { username } = req.params
    const movie = req.body

    const user = await userModel.findOne({ username })
    const isMoviePresent = user.watchlist.find(item => item.id === movie.id)

    if (isMoviePresent) {
        return res.status(200).json("Movie is in Watchlist")
    }
    else {
        return res.status(201).json("Movie is not in Watchlist")
    }
})

router.post('/isInLiked/:username', async (req, res) => {
    const { username } = req.params
    const movie = req.body

    const user = await userModel.findOne({ username })
    const isMoviePresent = user.liked.find(item => item.id === movie.id)

    if (isMoviePresent) {
        return res.status(200).json("Movie is in Liked")
    }
    else {
        return res.status(201).json("Movie is not in Liked")
    }
})

router.post('/isInWatched/:username', async (req, res) => {
    const { username } = req.params
    const movie = req.body

    const user = await userModel.findOne({ username })
    const isMoviePresent = user.watched.find(item => item.id === movie.id)

    if (isMoviePresent) {
        return res.status(200).json("Movie is in Watched")
    }
    else {
        return res.status(201).json("Movie is not in Watched")
    }
})

router.get('/user/:username', async (req, res) => {
    const username = req.params.username

    try {
        const user = await userModel.findOne({ username })
        if (user) {
            return res.send(user)
        }
        return res.json("User not found")
    }
    catch (err) {
        console.log(err)
    }

})

router.post('/profileUpdate/:username', async (req, res) => {
    const { username } = req.params
    const imageLink = req.body.imageLink

    try {
        const user = await userModel.findOne({ username })
        if (user) {
            user.profilePic = imageLink
            await user.save()
        }
        else {
            res.status(400).json("user does not exist")
        }
    }
    catch (err) {
        console.log(err)
    }

})

router.post('/removeFromFavMovies/:username', async (req, res) => {
    const { username } = req.params
    const movie = req.body

    const user = await userModel.findOne({ username })
    const newwatched = user.favourites.movies.filter(item => item.id != movie.id)
    user.favourites.movies = newwatched
    await user.save()
    return res.status(201).json({ "Status": "Movie removed" })
})

router.post('/pushToFav/:username', async (req, res) => {
    const { username } = req.params
    const movie = req.body

    const user = await userModel.findOne({ username })
    try {
        user.favourites.movies.push(movie)
        await user.save()
        res.status(200).json(movie)
    }
    catch (err) {
        console.log(err)
    }
})

router.post('/pushToFavActors/:username', async (req, res) => {
    const { username } = req.params
    const actor = req.body

    const user = await userModel.findOne({ username })
    try {
        user.favourites.actors.push(actor)
        await user.save()
        res.status(200).json(actor)
    }
    catch (err) {
        console.log(err)
    }
})

router.post('/removeFromFavActors/:username', async (req, res) => {
    const { username } = req.params
    const actors = req.body

    const user = await userModel.findOne({ username })
    const newwatched = user.favourites.actors.filter(item => item.id != actors.id)
    user.favourites.actors = newwatched
    await user.save()
    return res.status(201).json({ "Status": "Actor removed" })
})

router.post('/pushToFavDirectors/:username', async (req, res) => {
    const { username } = req.params
    const directors = req.body

    const user = await userModel.findOne({ username })
    try {
        user.favourites.directors.push(directors)
        await user.save()
        res.status(200).json(directors)
    }
    catch (err) {
        console.log(err)
    }
})

router.post('/removeFromFavDirectors/:username', async (req, res) => {
    const { username } = req.params
    const directors = req.body

    const user = await userModel.findOne({ username })
    const newwatched = user.favourites.directors.filter(item => item.id != directors.id)
    user.favourites.directors = newwatched
    await user.save()
    return res.status(201).json({ "Status": "Actor removed" })
})

module.exports = router