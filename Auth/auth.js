const Gym = require('../Modals/gym');
const jwt = require('jsonwebtoken');


const auth = async (req,res,next) =>{ 
    try{

        const token = req.cookies['cookie-token'] || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ error: 'No token, authorization denied' });
        }


        const decode = jwt.verify(token,process.env.JWT_SECRET_KEY);
        
        req.gym = await Gym.findById(decode.gym_id).select('-password');

        next();


    }catch(err){
        res.status(401).json({ error: 'Token is not valid' });
    }
}

module.exports = auth;