require('dotenv').config();
const express = require('express');
const auth = require('./middleware/auth');

require("./db/conn");

const port= process.env.PORT || 3000;

//express app
const app= express();

var txt= 'host'
var url=`http://localhost:${port}/`
console.log(txt.link(url))


//express view engine
app.set('view engine', 'ejs')

//listen for requests
app.listen(port);

// static files directory
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))

//getting players model as a json object 
app.use(express.urlencoded({ extended: true }));

app.use(require('./router/routes'))

    app.get('/home', auth,(req,res)=>{
        res.render('home');
    })

    app.get('/games', auth,(req,res)=>{
        res.render('games');
    })

    app.get('/about',(req,res)=>{
        res.render('about');
    })

    app.get('/login',(req,res)=>{
        res.render('login');
    })

    app.get('/register',(req,res)=>{
        res.render('register');
    })

    //Games
    app.get('/StonePaperScissor',auth,(req,res) =>{
        res.render('StonePaperScissor')
    })

    app.get('/MemoryGame',auth,(req,res) =>{
        res.render('MemoryGame')
    })

    app.get('/Shooter',auth,(req,res) =>{
        res.render('Shooter')
    })

    app.get('/TicTacToe',auth,(req,res) =>{
        res.render('TicTacToe')
    })

    app.get('/players',auth,(req,res) =>{
        res.render('players')
    })

app.use((req,res)=>{
    res.render('404')
})

