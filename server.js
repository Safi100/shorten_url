const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const methodOverRide = require('method-override')
const ShortUrl = require('./models/shortUrl')
const app = express()

mongoose.connect('mongodb://localhost/Shorts', {
  useNewUrlParser: true, useUnifiedTopology: true
})
app.use(morgan('dev'))
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(methodOverRide('_method'))
app.listen(3000, ()=> console.log("listining on port 3000"))

app.get('/', async (req, res)=>{
    res.redirect('/ShortUrl')
})
app.get('/ShortUrl', async (req, res)=>{
    const shortUrls = await ShortUrl.find()
    res.render('index', {title: 'Home', URLs:shortUrls})
})
app.post('/ShortUrl', async (req, res)=>{
    await ShortUrl.create({
        full: req.body.fullUrl,
        createdAt: new Date()
    })
    console.log(req.body.fullUrl)
    res.redirect('/')
})
app.get('/:ShortUrls', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.ShortUrls })
    if (shortUrl == null) return res.status(404).render('404', {title: 'Not Found'})
    shortUrl.visited++
    shortUrl.save()
    res.redirect(shortUrl.full)
  })
app.delete('/ShortUrl/:id', async (req, res) =>{
    console.log(req.params.id);
    await ShortUrl.findByIdAndDelete(req.params.id)
    res.redirect('/')
})
app.use((req, res) =>{
    res.status(404).render('404', {title: 'Not Found'})
})