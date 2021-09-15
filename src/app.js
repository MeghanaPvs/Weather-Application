const path = require('path');
const express = require('express')
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();


//Defining paths for express config
const pathDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views') //for views
const partialPath = path.join(__dirname,'../templates/partials') //for partials

//Setting up handlebars:
app.set('view engine','hbs');
//setting up views locations
app.set('views', viewsPath)
//Setting up partials
hbs.registerPartials(partialPath)

//setting up static directory to serve
app.use(express.static(pathDirectory)) //Run: http://localhost:3000/help.html ; http://localhost:3000/about.html; http://localhost:3000

//hbs
app.get('',(req,res)=>{ //''=> represents home page
    res.render('index',{//to handle handlebars template
        title:'Weather Application',    
        name:'Meghana'
    }) 
    //render() => 2 params: 1. provide name of the particular view we want to use here index.hbs
                        //  2. object: which we need to access 

});


app.get('/about',(req,res)=>{ //  '/about' => for about page
    res.render('about',{//to handle handlebars template
        title:'About Me',    
        name:'Meghana'
    })
});

app.get('/help',(req,res) => {
    res.render('help',{
       message:"Help Page",
       title:'Help',
       name:'Meghana'
    })

});

app.get('/weather',(request,response)=>{
    // response.send('Weather page')
     //if no address => error
     if(!request.query.address)
     {
         return response.send({
             error:'Address must be specified'
         })
     }
     geocode(request.query.address,(error,{latitude,longitude,location}={})=>{
         if(error){
              return response.send({error})
         }
    forecast(latitude,longitude,(error,forecastData)=>{
        if(error){
            return response.send({error})
        }
        response.send({
            forecast: forecastData,
            location,
            address:request.query.address
        })
    })

 })

}) //Run: http://localhost:4000/weather?address=maldives
    
    // response.send({
    // forecast:'Its cloudy',
    // location:'Bali',
    // address:request.query.address
    // })      
 //localhost:4000/weather?address=boston

//Query String:
app.get('/products',(req,res)=>{
    if(!req.query.search) //when search not available
    {
         return res.send({
            error:'You must Provide search term'
        })
    }
    console.log(req.query.search)  //Run: http://localhost:4000/products?search=games&rating=5
    res.send({
        products:[]
    })
})//http://localhost:4000/products


//404 error route:
app.get('/help/*',(req,res)=>{ 
    res.render('404',{
        title:'404',
        name:'Meghana',
        errorMessage:'Help article not found'
    })
})
//404 error route:
app.get('*',(req,res)=>{ // '*' ==> represents everything that doesnot match with url provided in browser
    res.render('404',{
        title:'404',
        name:'Meghana',
        errorMessage:'Page not found'
    })
})
app.listen(4000,()=>{
    console.log('Listening on: 4000')
})
