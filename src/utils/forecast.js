const request = require('request')
const chalk = require('chalk')
const forecast = (latitude,longitude,callback)=>{
    const url ='https://api.darksky.net/forecast/13d0f7ee4d07691f2838140c63c93a26/'+latitude+','+longitude+'?units=si'

    request({url,json : true},(error,{body}={})=>{
     if(error){
         callback({error :'Unable to connect to weather-app!!'},undefined)
     } else if(body.error){
         callback({error :'Unable to find location'},undefined)
     } else {
         callback(undefined,{
             summary : body.daily.data[0].summary,
             temperature : body.currently.temperature,
             rain_probability : body.currently.precipProbability,
             timezone :body.timezone
         })
    }

 })
}

module.exports = forecast