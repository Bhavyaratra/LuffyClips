require('dotenv').config();
const fs = require('fs');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const auth = require('./middleware/auth');


require("./db/conn");


const players = require('./models/register');


const port= process.env.PORT || 3000;

//express app
const app= express();

var txt= 'host'
var url=`http://localhost:${port}/`
console.log(txt.link(url))

//cookie-parser middleware
app.use(cookieParser());

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

app.use(function(req,res,next){ 
    res.locals.user = req.cookies.jwt; //sending user too all pages
next();
});

app.get('/',(req,res)=>{
    res.render('home');
})

app.get('/home',(req,res)=>{
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

app.get('/logout',auth, async(req,res)=>{
    try{
        req.player.tokens = req.player.tokens.filter((currentPlayer)=>{
            return currentPlayer.token !== req.token;
        })

        res.clearCookie("jwt");  //clears cookie
        await req.player.save(); //
      
        res.render('logout',{user: false});
    }catch{
        
        res.status(401).send("Login First")
    } 
})

app.get('/register',(req,res)=>{
    res.render('register');
})

// Display all player 
app.get('/players',auth,(req,res)=>{
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

//login authentication
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
                //cookies
                res.cookie("jwt", token,{
                httpOnly:true
                });

                res.status(201).render('home',{user: true});
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

