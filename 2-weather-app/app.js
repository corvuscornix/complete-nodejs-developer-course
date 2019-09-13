const chalk = require('chalk')
const {fetchCoordinatesForLocationName, fetchWeatherDataForCoordinates} = require('./utils')

function printError(error) {
    console.log(chalk.red.inverse(error))
}

function printWeather(placeName, summary, temperature, rainProbability) {
    console.log(chalk.green.inverse(`${placeName}\r\n${summary} It is currently ${temperature} degrees celsius out. There is a ${rainProbability}% chance of rain`))
}

const location = process.argv[2]

if (location) {
    fetchCoordinatesForLocationName(location,
        ({center, place_name}) => fetchWeatherDataForCoordinates(center[0], center[1], (data) => {
            const { daily, currently } = data
            printWeather(place_name, daily.data[0].summary, currently.temperature, currently.precipProbability)
        }, printError),
        printError
    )
} else {
    printError('Please provide location as an argument, i.e. "node app Helsinki"')
}