const request = require('request');

// String format polyfill
if (!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined' ? args[number] : match;
        });
    };
}

const weatherUrlTemplate = `https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/{0},{1}?units=si&lang=en&limit=1`;
const geocodingUrlTemplate = `https://api.mapbox.com/geocoding/v5/mapbox.places/{0}.json?access_token=${process.env.MAPBOX_API_KEY}`;

function fetchCoordinatesForLocationName(location, callback, errorCallback) {
    const url = geocodingUrlTemplate.format(location);
    request.get({ url, json: true }, (error, { body }) => {
        if (error) {
            errorCallback({ error: 'Unable to connect to location service!' });
        } else if (!body.features.length) {
            errorCallback({
                error: `Didn't find location for '${body.query.join(' ')}'`
            });
        } else {
            const location = body.features[0];
            callback(location);
        }
    });
}

function fetchWeatherDataForCoordinates(
    longitude,
    latitude,
    callback,
    errorCallback
) {
    const url = weatherUrlTemplate.format(latitude, longitude);
    request.get({ url, json: true }, (error, { body }) => {
        if (error) {
            errorCallback({ error: 'Unable to connect to weather service!' });
        } else if (body.error) {
            errorCallback({ error: `${body.error} (${body.code})` });
        } else {
            callback(body);
        }
    });
}

module.exports = {
    fetchCoordinatesForLocationName,
    fetchWeatherDataForCoordinates
};
