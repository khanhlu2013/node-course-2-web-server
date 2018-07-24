const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
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
app.use((req,res,next)=>{
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log + '\n',err=>{ if(err) console.log('unable to log into file')});
    next();
})
const maintenance = false;
if(maintenance){
    app.use((req,res,next)=>{
        res.render('maintenance.hbs');
    });
}
app.use(express.static(__dirname + '/public'));


//route
app.get('/',(req,res)=>{
    res.render('index.hbs',{
        welcomeMessage: 'Welcome to my page!'
    })
})
app.get('/about',(req,res)=>{
    res.render('about.hbs');
})
app.get('/projects',(req,res)=>{
    res.render('projects.hbs');
})

//listen
app.listen(port,()=>{console.log(`App is serving no port ${port}`)});