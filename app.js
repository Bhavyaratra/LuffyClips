require('dotenv').config();
const fs = require('fs');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require("./db/conn");


const players = require('./models/register');

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

app.get('/',(req,res)=>{
    res.render('login');
})

app.get('/home',(req,res)=>{
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

// Display all player 
app.get('/players',(req,res)=>{
    players.find().sort({createdAt: 1})
    .then((result)=>{
        res.render('players',{ players: result})
        // console.log(result);
    })
    .catch((err)=>{
      console.log(err);
    })
  })


//Saving registration data to database 
app.post('/register',async (req,res)=>{
    try{
        const password = req.body.password;
        const password2 = req.body.password2;
            if(password===password2){
                const player = new players(req.body); 
                
                const token = await player.generateAuthToken();
                player.save()
                 .then(result=>{
                     res.redirect('/login');
                 })
                 .catch(err=>{
                    res.redirect('/register');
                     console.log("registration error");
                 })


            }else{
                res.send('password does not match');
            }

        // console.log(req.body);
        
    } catch(error) {
        res.status(400).send(err);
        }
})

//pseudo login authentication
app.post("/login", async(req,res) => {
    try{

        const email= req.body.email;
        const password = req.body.password;
            // {email}
        players.findOne({email:email})
        .then(async (result)=>{
                            //comparing password with crypted pswrd in db
            const isMatch=await bcrypt.compare(password, result.password )
            const token = await result.generateAuthToken();
            if(isMatch)
            {
                res.status(201).render('home');
            }else{
                res.send("wrong pswrd")
            }

        }).catch(err=>{
            console.log(err);
            res.status(400).send("Invalid Email")
        })
         

        // console.log(`${email} and ${password}`)

    } catch(error) {
        res.status(400).send(err);
        }
})


//Games

app.get('/StonePaperScissor',(req,res) =>{
    res.render('StonePaperScissor')
})

app.get('/MemoryGame',(req,res) =>{
    res.render('MemoryGame')
})

app.get('/Shooter',(req,res) =>{
    res.render('Shooter')
})

app.get('/TicTacToe',(req,res) =>{
    res.render('TicTacToe')
})

app.get('/players',(req,res) =>{
    res.render('players')
})

app.use((req,res)=>{
    res.render('404')
})

