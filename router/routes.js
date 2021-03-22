const cookieParser = require('cookie-parser');
const express = require('express')
const auth = require('../middleware/auth');
const players = require('../models/register');
const bcrypt = require('bcryptjs');
const router = express.Router();

router.use(cookieParser());
router.use(express.urlencoded({ extended: true }));

router.use(function(req,res,next){ 
        res.locals.user = req.cookies.jwt; //sending user too all pages
    next();
    });

    router.get('/',(req,res)=>{
        res.render('home');
        console.log('router')
    })

router.get('/logout',auth, async(req,res)=>{
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

// Display all player 
router.get('/players',auth,(req,res)=>{
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
router.post('/register',async (req,res)=>{
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
router.post("/login", async(req,res) => {
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


module.exports = router;