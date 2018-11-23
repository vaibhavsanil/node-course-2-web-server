const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));

app.use((req,res, next) => {
    var now = new Date().toString();
    //console.log(`${req}`);
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log')
        }
    });
    next();
});

/*app.use((req,res, next) => {
    res.render('maintainence.hbs')
});*/

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});


hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/',(req,res) => {
        res.render('home.hbs',{
            pageTitle: 'Welcome Page',
            welcomeMessage:'Welcome Vaibhav',
           // currentYear: new Date().getFullYear()
        });
    });



app.get('/about', (req, res) => { 
    res.render('about.hbs',{
        pageTitle:'About Page',
       // currentYear: new Date().getFullYear()
    });
});

//Bad Response - Send Back json with error message

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});