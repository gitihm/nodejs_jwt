const database = require('./database')
const passport = require('passport')
const passportJWT = require('passport-jwt')
const jwt = require('jsonwebtoken')
var jwtOptions ={}
exports.use = ()=>{
    
    let ExtractJwt = passportJWT.ExtractJwt
    let JwtStrategy = passportJWT.Strategy
    jwtOptions.jwtFromRequest =ExtractJwt.fromAuthHeaderAsBearerToken()
    jwtOptions.secretOrKey = "ihm"

    let strategy = new JwtStrategy(jwtOptions,(jwt_payload,next)=>{
        console.log("payload received : ",jwt_payload );
        let user = database.getUser({id:jwt_payload.id})
        if(user){
            next(null,user)
        }else{
            next(null,false)
        }
    })
    passport.use(strategy)
}
exports.passport = passport
exports.jwtOptions = jwtOptions
exports.jwt = jwt