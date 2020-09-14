const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

//define path for express config
const directory = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath)
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(directory))

app.get('', (req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Bial Ahmed'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Bial Ahmed'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        name: 'Bial Ahmed'
    })
})
app.get('/weather',(req, res)=>{
    res.send({
        forcast: 'Raining and temp: 27 degree\'s',
        location: 'Lahore Pakistan'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title: '404',
        errorMsg: '- Help article not found',
        name: 'Bial Ahmed'
    })
})
//For 404 Error and it should always at bottom
app.get('*', (req,res)=>{
    res.render('error',{
        title: '404',
        errorMsg: '- Page not Found',
        name: 'Bial Ahmed'
    })
})

app.listen(3000, ()=> {
    console.log('server is running on 3000')
})