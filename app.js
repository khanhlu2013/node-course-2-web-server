const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

//hbs
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
})
hbs.registerHelper('screamIt',txt=>txt.toUpperCase());
app.set({
    'view engine' : hbs
});

//middleware
app.use(express.static(__dirname + '/public'));
app.use((req,res,next)=>{
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log + '\n',e=>console.log('unable to log into file'));
    next();
})
app.use((req,res,next)=>{
    res.render('maintenance.hbs');
});

//route
app.get('/',(req,res)=>{
    res.render('index.hbs',{
        welcomeMessage: 'Welcome to my page!'
    })
})
app.get('/about',(req,res)=>{
    res.render('about.hbs');
})

//listen
app.listen(3000,()=>{console.log('App is serving no port 3000')});