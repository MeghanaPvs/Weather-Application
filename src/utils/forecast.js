const request = require('postman-request')

const forecast = (latitude, longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=40e422ba23109f64c18872d2f1c4081a&query=' + latitude + ',' + longitude + '&units=f'
    // request({ url:url, json:true }, (error, response) => { 
      //rplacing response with body
      request({ url, json:true }, (error, {body}) => {

            if(error) //if any network issue
            {
              callback('Unable to connect to weather service',undefined)
            }
            else if(body.error) //invalid url
            {
              callback('Unable to find location',undefined)
            }
            else
            {
              callback(undefined,'Its '+body.current.weather_descriptions[0]+'. Currently temperature is '+ body.current.temperature+' degrees out.There is '+body.current.feelslike +' % chance of rain')

            }
})
}
module.exports = forecast;