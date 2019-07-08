console.log('JS file loaded.....')


const formObject = document.querySelector('form');
const searchElement = document.querySelector('input')

formObject.addEventListener('submit', (eventValue) => {

    eventValue.preventDefault()
    
    document.querySelector('#responseValue').textContent = ''
    document.querySelector('#precipitation').textContent = 'Fetching Forecast....'
    document.querySelector('#message').textContent = ''


    const location = searchElement.value

    fetch('http://localhost:3000/weather?location='+location).then((response) => {
        
        
           
        response.json().then((JSONdata) => {
            //console.log(error)
            console.log(JSONdata.errorCode);

            if(JSONdata.errorCode){
                console.log('Error-Code Not Empty')
                document.querySelector('#responseValue').textContent = "Error: "+JSONdata.errorCode
                document.querySelector('#precipitation').textContent = ''
                document.querySelector('#message').textContent = JSONdata.errorMessage
            }
            else{
                document.querySelector('#responseValue').textContent = JSONdata.temperature
                document.querySelector('#precipitation').textContent = "Precipitation : "+ JSONdata.precipitation
                document.querySelector('#message').textContent = "Summary : "+JSONdata.summary


            }


        })
    })

    console.log('Location :', location);
})