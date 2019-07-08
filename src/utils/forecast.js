const request = require('request');

const forecast = (longitude,latitude,callback) => {

const darkskyKey = 'ab7fbedba88a56869ca481e4f9d91c40'
const darkskyLang = 'ta'
const units = 'si'
const darkskyUrlProperties = '?darkskyLang='+darkskyLang+'&units='+units;
const url = 'https://api.darksky.net/forecast/'+darkskyKey+'/'+latitude+','+longitude+darkskyUrlProperties;
//console.log('darksky url'+ url)

request({url , json : true}, (error,{body}) => {
    if(error){
        callback('Unable to reach Weather Services. Check Network Connection',undefined)
    }
    else if(body.error){
        callback('Invalid Request',undefined)
    }
    else{
        callback(undefined,{
            summary : body.daily.data[0].summary,
            precipitation : body.currently.precipProbability,
            temperature : body.currently.temperature 
        })
    }
})


}

module.exports = {
    forecast : forecast
}