const request = require('request')

foreCast = (latitude, longitude, callback) =>{
    url = 'https://api.darksky.net/forecast/e6af5b5feb891b272e18f5e2fc0370a6/'+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'?units=si'
    request({url,json:true}, (error,{body})=>{
        if(error){
            callback('Unable to connect to weather service..!!',undefined)
        }else if(body.error){
            callback('Unable to find location, Try another one..!!',undefined)
        }else{
           callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = foreCast