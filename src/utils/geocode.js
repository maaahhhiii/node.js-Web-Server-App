const request = require('request');


const geocode = (location, callback) => {
    
    const mapboxKey = 'pk.eyJ1IjoibWFhYWhoaGlpaSIsImEiOiJjangwc2Q0d2IwMjZtNGFwOW14dnJ1d3lxIn0.-gXSJIldXhi19GxriEWtPQ'

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+location+'.json?access_token='+mapboxKey

    //console.log(url)

    request({url , json : true}, (error,{body}) => {
        
        if(error){
            callback('Unable to connect to the Location Servers',undefined)
        }
        else if(body.features.length === 0){
            callback('Invalid location search. Try with a valid location',undefined)
        }
        else{
            callback(undefined,{
                longitude : body.features[0].center[0],
                latitude : body.features[0].center[1],
                location : body.features[0].place_name
            })
        }
    })
}


module.exports = {
    geocode : geocode
}