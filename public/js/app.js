const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')
weatherForm.addEventListener('submit',(e)=>{

    e.preventDefault()
    messageone.textContent = 'Loading...'
    messagetwo.textContent = ''

    fetch('/weather?address='+ search.value).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageone.textContent = data.error
            messagetwo.textContent = ''
        } else{
            messageone.textContent = 'location is '+data.location
            messagetwo.textContent = data.summary+'.Temperature is '+data.temperature+' degree celcius With '+data.rain_probability+'% chances of rain.'+' Highest Temperature recorded for the day is '+data.temperatureHigh+' degree celcius ,lowest temperature recorded is '+data.temperatureLow+'.Information is gathered from timezone '+ data.timezone+'.'
        }
    })
})
})