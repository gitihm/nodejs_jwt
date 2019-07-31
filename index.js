const express = require("express")
const bodyParser = require("body-parser")
const database = require('./database')
const authentication = require('./jwt')

const app = express()


database.connect()

app.use(authentication.passport.initialize())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get('/', (req,res)=>{
    res.json({message : "Start Now!"})
})
app.get('/users',(req,res)=>{
    database.getAllUsers()
    .then(user => res.json(user))
})
app.post('/register',(req,res)=>{
    const {name ,password} = req.body
    database.createUser({name,password})
    .then(user => res.json({user,message:"Account created successfully."}))
})

app.post('/login',async (req,res)=>{
    const { name , password } = req.body
    if(name&&password){
        let user = await database.getUser({name})

        if(!user){
            res.status(401).json({message:"No such user found ",user:name})
        }
        if(user.password == password){
            let payload = { id: user.id }
            let token = authentication.jwt.sign(payload,authentication.jwtOptions.secretOrKey)
            res.json({message:'ok',token:token})
        }
        else{
            res.status(401).json({message:'Password is incorrect!'})
        }
    }
})
app.get('/protected',authentication.passport.authenticate('jwt',{session:false}),(req,res)=>{
    res.json({message:"Congrates! You are seeing this because you are authorized"})
})
app.listen(3000 , ()=>{
    console.log("Running in port 3000");
})