const fs = require('fs')
const express = require('express');

//express app
const app= express();

//express view engine
app.set('view engine', 'ejs')

//listen for requests
app.listen(3000);

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))

app.get('/',(req,res)=>{
    res.render('home');
})

app.get('/about',(req,res)=>{
    res.render('about');
})

app.get('/login',(req,res)=>{
    res.render('login');
})

app.get('/logout',(req,res)=>{
    res.render('logout');
})

app.get('/register',(req,res)=>{
    res.render('register');
})

app.get('/StonePaperScissor',(req,res) =>{
    res.render('StonePaperScissor')
})

app.get('/MemoryGame',(req,res) =>{
    res.render('MemoryGame')
})

app.get('/Shooter',(req,res) =>{
    res.render('Shooter')
})



app.use((req,res)=>{
    res.render('404')
})