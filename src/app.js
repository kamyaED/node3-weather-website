const path = require('path')
const express = require('express');
const hbs = require('hbs');
const request = require('request');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define Paths for Express Conifg
const publicDirectoryPath = path.join(__dirname,'../public'); 
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebar engine view and location
app.set('view engine','hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// Setup static path
app.use(express.static(publicDirectoryPath));

// Pages
app.get('',(req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Kamya'
    });
})

app.get('/about',(req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Kamya'
    });
})

app.get('/help',(req, res) => {
    res.render('help',{
        title: 'Help',
        name: 'Kamya',
        msg: 'You can contact us at any time'
    })
})

//
app.get('/weather', (req, res) => {
    
    if(!req.query.address)
    {
        return res.send({
            error: "Please provide address!"
        });
    }
    
    geocode(req.query.address, (error, {lattitude, longitude, location}={})=> {
        
        if(error)
        {
            return res.send(error);
        }

        forecast(lattitude, longitude, (error, forecastData) => {
            
            if(error)
            {
                return res.send(error);
            }

            res.send({
                location,
                longitude,
                forecastData
            })            
        })

    })
});


app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Kamya',
        errorMsg: 'Page Not Found!'
    })
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
})