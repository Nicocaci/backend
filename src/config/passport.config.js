
const passport = require('passport')
const jwt = require('passport-jwt') 


const JWTStategy = jwt.Strategy; 
const ExtractJwt = jwt.ExtractJwt; 

const initializePassport = () => {
    passport.use("current", new JWTStategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]), 
        secretOrKey: "lajuntavino",
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload);
        } catch (error) {
            return done(error); 
        }
    }))
}

//Creamos el cookie extractor: 
const cookieExtractor = (req) => {
    let token = null; 
    if( req && req.cookies ) {
        token = req.cookies["coderCookieToken"]; 
    }
    return token; 
}

module.exports = initializePassport; 