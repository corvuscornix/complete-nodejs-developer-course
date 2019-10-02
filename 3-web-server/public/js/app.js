
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.getElementById('message1')
const messageTwo = document.getElementById('message2')

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
            let content = `<p>${data.summary} Temperature ${data.temperature} °C  with ${data.possibilityOfRain} % possibility of rain.</p>`
            if (data.alerts) {
                data.alerts.forEach(alert => content += `<article><h5>${alert.title}</h5><p>${alert.description}</p></article>`)
            }

            messageTwo.innerHTML = content
        })
    })
})