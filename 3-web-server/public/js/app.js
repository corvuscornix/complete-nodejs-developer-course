
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.getElementById('result')
const messageTwo = document.getElementById('error')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    const location = search.value
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageTwo.textContent = 'ERROR: ' + data.error
                messageOne.textContent = ''
                return
            }
            messageOne.textContent = `Weather at ${data.location}`
            messageTwo.textContent = `${data.summary} Temperature ${data.temperature} °C  with ${data.possibilityOfRain} % possibility of rain.`
        })
    })
})