/* Core Imports */
const path = require('path')

/* Express Imports */
const express = require('express');
const hbs = require('hbs');

/* Package Imports */
const geocode = require('../src/utils/geocode');
const forecast = require('../src/utils/forecast');

/* console.log(__dirname);
console.log(__filename); */

const app = express();

/* Getting PORT Value */
const port = process.env.PORT || 3000
app.set('view engine','hbs');

const publicDirectory = path.join(__dirname,'../public');
console.log('Public directory',publicDirectory);

const viewsPath = path.join(__dirname,'../templates/views');
console.log('Views Path',viewsPath)

const partialsPath = path.join(__dirname,'../templates/partials')

app.set('views',viewsPath);

hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index',{
        title : 'Weather App',
        name : 'Mahi'
    })
} )

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About page',
        name : 'Mahi'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        title : 'Help Page',
        number : '+00 0000 0000',
        message : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vitae.'
    })
})


/* app.get('/help', (req,res) => {
    res.send(app.use(express.static(aboutPagePath)))
})

app.get('/about', (req,res) => {
    res.send('<h1> About Weather App </h1>')
}) */

app.get('/weather', (req,res) => {

    location = req.query.location;
    console.log("Location :",location);

    if(!location){
       return res.send({
            errorCode: 204,
            errorMessage: "Please provide a location"
        })
    }

    geocode.geocode(location, (error,{longitude,latitude,loc} = {}) => {
        if(error){
            console.log(error)
            return res.send({
                errorCode: 104,
                errorMessage: error
            })
        }

        forecast.forecast(longitude,latitude, (error,{summary,precipitation,temperature} = {}) => {
            if(error){
                console.log(error)
                return res.send({
                    errorCode: 504,
                    errorMessage : error
                })
            }
            res.send({
                location : loc,
                summary : summary,
                precipitation : precipitation,
                temperature :
                temperature
            })
        })
    })

    /* res.send({
        location : req.query.location,
        forecast : '23 degrees'
    }) */
})

app.get('/help/*', (req,res) => {
    res.render('404-Error',{
        errorCode : 'ERROR 304 :',
        errorRemark : 'Requested HELP Page not available',
        message : 'Have fun browsing other useful available pages !'
    })
})


app.get('*', (req,res) => {
    res.render('404-Error',{
        errorCode : 'ERROR 404 :',
        errorRemark : 'Page Not Found',
        
    })
})



app.listen(port, () => {
    console.log('Server is up and running in',port)
})