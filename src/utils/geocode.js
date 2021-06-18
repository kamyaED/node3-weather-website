const request = require('request');

const geocode = (address, callback) => {

    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoia2FteWFzdXJhaiIsImEiOiJja3B0Z3loNzYwazRwMnhvMW90OGVidzdiIn0.Q3PlJ-xnSMncgrmDhRppog&limit=1";
    request({url, json:true}, (error, {body}) => {
        if(error)
        {
            callback({
                error: "Location not find, Try another search!"
            }, undefined);
        }
        else if(body.features.length === 0)
        {
            callback({
                error: "Location not find, Try another search!"
            }, undefined);
        }
        else
        {
            const longitude = body.features[0].center[0];
            const lattitude = body.features[0].center[1];
            const location = body.features[0].place_name;
            const data = {
                longitude: longitude,
                lattitude: lattitude,
                location: location
            }    
            
            callback(undefined,data)
        }
    })
}

module.exports = geocode ;