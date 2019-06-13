const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path = require('path')
const hbs = require('hbs')
const express = require('express')

const app = express()
const publicDirectoryPath = path.join(__dirname,'../public')
const viewpath = path.join(__dirname,'../templates/views')
const partialpath = path.join(__dirname,'../templates/partials')


//setting handlebar engine and view setup
app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialpath)
//setting static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Aadarsh'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Aadarsh',
        aka : 'Baapchi'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        message:"Enter your location without , if it is not finding the location",
        name : 'Aadarsh'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){git 
        return res.send({
            error:'You must provide the address'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send(error)
        }
    
        forecast(latitude,longitude,(error,{summary,temperature,rain_probability,timezone}={})=>{
            if(error){
               return res.send(error)
            }
            res.send({
                summary,
                temperature,
                rain_probability,
                location,
                timezone,
                address:req.query.address
            })
        })
    })
})
app.get('/help/*',(req,res)=>{
    res.render('error',{
        name:'Aadarsh',
        title:'My 404 page',
        error:'Help not found'
    })
})
app.get('*',(req,res)=>{
    res.render('error',{
        name:'Aadarsh',
        title:'My 404 page',
        error :'Page not found'
    })
})


app.listen(3000,()=>{
    console.log('Server is running on port 3000')
});
