const request = require('request');

const forecast = (longitude, lattitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=f24b4528aacd45d98b7719a438a9bd06&query=' + longitude + ',' + lattitude + '&units=m';
    
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect weather services!', undefined);
        }
        else if( body.error){
            callback('Incorrect Location!', undefined);
        } 
        else {
            const temperature = body.current.temperature;
            callback(undefined, temperature);
        }   
        })
}

module.exports = forecast;