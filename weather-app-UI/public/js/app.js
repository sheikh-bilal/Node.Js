console.log('Client side javaScript file')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg1')
const msgTwo = document.querySelector('#msg2')

weatherForm.addEventListener('submit',(e)=>{

    msgOne.textContent = 'Loading...'
    msgTwo.textContent = ''
    e.preventDefault()
    fetch('/weather?address='+encodeURIComponent(search.value)).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                console.log(data.error)
                msgTwo.textContent = 'Error: '+data.error
                msgOne.textContent = ''
            }else{
                msgOne.textContent = 'Location: '+data.location
                msgTwo.textContent = 'Forecast: '+data.forecast
                console.log(data.location)
                console.log(data.forecast)
            }
            
        })
    })
})
