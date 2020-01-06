const https = require('https');
const url = `https://api.darksky.net/forecast/${process.env.DARSKY_API_KEY}/42.3601,-71.0589`;

const request = https.request(url, response => {
    let data = '';

    response.on('data', chunk => {
        data = data + chunk.toString();
    });

    response.on('end', () => {
        const body = JSON.parse(data);
        console.log(body);
    });
});

request.on('error', error => {
    console.log('An error', error);
});

request.end();
