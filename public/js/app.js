console.log('Client Side Javascript file is loaded!!')


// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1') //matches <p> tag with id
//messageOne.textContent = 'From Javascript' 
const messageTwo = document.querySelector('#message-2') //matches <p> tag with another id 

//when form submits return data
//2 params: 1.events and 2.callback: runs everytym when form submitted
weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault();//prevents default behaviour of refreshing the browser
    const location = search.value
    // console.log(location)

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = '' //empty string: to clear the previous location value
    
    fetch('http://localhost:4000/weather?address='+location).then((response) => {
    //+location: --> to know which address we need to specify in form
    response.json().then((data) => {
    if (data.error) {
        // console.log(data.error)
        messageOne.textContent = data.error
    } 
    else {
    messageOne.textContent = data.location
    messageTwo.textContent = data.forecast
     // console.log(data.location)
    // console.log(data.forecast)
    }
    })
    }) 
})
