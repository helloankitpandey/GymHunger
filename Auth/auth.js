const Gym = require('../Modals/gym');
const jwt = require('jsonwebtoken');


const auth = async (req,res,next) =>{ 
    try{

        const token = req.cookies['cookie-token'] || req.headers.authorization?.split(" ")[1];

        // console.log("Auth Middleware - Token:", token);

        if (!token) {
            return res.status(401).json({ error: 'No token, authorization denied' });
        }


        const decode = jwt.verify(token,process.env.JWT_SECRET_KEY);

        // console.log("Auth Middleware - Decoded Token:", decode);
        
        const mongoose = require('mongoose');

        try {
            req.gym = await Gym.findById(new mongoose.Types.ObjectId(decode.gym_id)).select('-password');
            // console.log("Auth Middleware - Gym found:", req.gym);
        } catch (err) {
            // console.error("Auth Middleware - Error finding gym by ID:", err);
            return res.status(500).json({ error: 'Server error while fetching gym' });
        }

        if (!req.gym) {
            return res.status(401).json({ error: 'Gym not found, authorization denied' });
        }

        next();


    }catch(err){
        // console.error("Auth Middleware Error:", err);
        res.status(401).json({ error: 'Token is not valid' });
    }
}

module.exports = auth;