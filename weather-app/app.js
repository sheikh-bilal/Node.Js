const request = require('request')
const geoCode = require('./utlis/geoCode')
const foreCast = require('./utlis/foreCast')
const value = process.argv[2]
if(value){
    geoCode(value, (error,{latitude, longitude, location})=>{
        if(error){
          return console.log('Error: ', error)
        }
   
       const forcastWeather = foreCast(latitude,longitude,(error,forecastData)=>{
           if(error){
               return console.log('Error: ', error)
           }
           console.log(location)
           console.log(forecastData)
       })
    })
}else{
    console.log('Please Provide the location..!!')
}


