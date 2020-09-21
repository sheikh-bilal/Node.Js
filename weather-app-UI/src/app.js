const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utlis/geoCode')
const foreCast = require('./utlis/foreCast')

const app = express()
const port = process.env.PORT || 3000

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
    if(!req.query.address){
        return res.send({
            error: 'You must enter an Address..!!'
        })
    }
    geoCode(req.query.address, (error,{latitude, longitude, location} = {})=>{
        if(error){
            return res.send({ error })
        }
   
       const forcastWeather = foreCast(latitude,longitude,(error,forecastData)=>{
           if(error){
                return res.send({ error })
           }
           res.send({
            forecast: forecastData,
            location: location,
         })
       })
    })  
})
app.get('/products', (req,res)=>{ 
    if(!req.query.search){
        return  res.send({
            error: 'You must provide a search term..!!'
        })
    }
    res.send({
        product: []
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

app.listen(port, ()=> {
    
    console.log('server is running on ' +port)
})