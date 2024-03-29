const path = require('path')
const express = require('express')
const hbs = require('hbs')
const {fetchWeatherDataForLocation} = require('./utils')

const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express();
const port = process.env.PORT || 3000

// Setup handlebars engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Danish'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Andrew Danish'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Andrew Danish',
        helpText: 'Welcome to help page'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query || !req.query.address) {
        return res.send({
            error: 'You must provide address'
        })
    }

    fetchWeatherDataForLocation(req.query.address, (error, data) => {
        if (error) {
            res.send({error})
        } else {
            const { place_name } = data.locationData
            const { daily, currently, alerts } = data.weatherData
            res.send({
                address: req.query.address,
                location: place_name,
                summary: daily.data[0].summary,
                temperature: currently.temperature,
                possibilityOfRain: currently.precipProbability,
                alerts
            })
        }
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Danish',
        message: 'Article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Danish',
        message: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('server is running on port ' + port)
}) 