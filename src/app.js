const path =require('path')
const express = require('express')
const hbs = require('hbs')

app = express()



const publicDirPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs')
app.set('views',viewPath)

app.use(express.static(publicDirPath))

hbs.registerPartials(partialsPath)

app.get('', (req,res) => {
    res.render('index',{
        title: 'This is Home Page',
        name: 'Avinash',
        footer: 'This is Home Footer'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        name: 'Avinash',
        footer: 'This is About Footer'

    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        msg: 'What help do you need?',
        title: 'This is Helper Text',
        name: 'Avinash',
        footer: 'This is Help Footer'

    })
})

app.get('/products', (req,res) => {
    if(!req.query.search) {
        return res.send({
            error: 'Please provide a search key value'
        })
    }

    res.send({
        products: []
    })
})


app.get('/help/*', (req,res)=>{
    res.render('error', {
        title: 'Helper Text Not Found',
        footer: 'Footer',
        errorMsg: 'PLease check the url, Page not found'
    })
})
app.get('*' , (req,res) => {
    res.render('error.hbs', {
        title: '404 Error',
        footer: 'This is Footer',
        errorMsg: 'Page not found'
    })
})

app.listen(3000,() => {
    console.log("Server Started...!")
})