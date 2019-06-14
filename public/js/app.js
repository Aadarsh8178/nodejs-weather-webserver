const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message = document.querySelector('#message-0')
const messageone = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')
weatherForm.addEventListener('submit',(e)=>{

    e.preventDefault()
    message.textContent = ''
    messageone.textContent = 'Loading...'
    messagetwo.textContent = ''
    

    fetch('/weather?address='+ search.value).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            message.textContent = ''
            messageone.textContent = data.error
            messagetwo.textContent = ''
        } else{
            message.textContent = 'As you are there it must be hot out there but for the sake of the numbers '
            messageone.textContent = 'location is '+data.location
            messagetwo.textContent = data.summary+'.Temperature is '+data.temperature+' degree celcius With '+data.rain_probability+'% chances of rain.'+' Highest Temperature recorded for the day is '+data.temperatureHigh+' degree celcius ,lowest temperature recorded is '+data.temperatureLow+'.Information is gathered from timezone '+ data.timezone+'.'   
        }
    })
})
})