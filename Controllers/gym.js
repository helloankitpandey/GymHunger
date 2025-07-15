const Gym = require("../Modals/gym")
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');


exports.register = async(req,res)=>{
    try {
        const {userName,password,gymName,profilePic,email}=req.body;

        const isExist = await Gym.findOne({userName});
        if(isExist){
            res.status(400).json({
                error:"Username Already Exist , Please try with other username"
            })
        }else{
            const hashedPassword = await bcrypt.hash(password,10)   
            const newGym = new Gym({userName,password:hashedPassword,gymName,profilePic,email});
            await newGym.save();

            res.status(201).json({
                message:"User Register succesfully!!",
                success : "true",
                data:newGym
            })
        }
    } catch (error) {
        // Added console for debug
        // console.log(error);
        
        res.status(500).json({
            error:"Server Error"
        })
    }
}

const cookieOptions = {
    httpOnly : true,
    secure : false,// set to true during production
    sameSite:'Lax'
};

exports.login = async(req,res)=>{
    try {
        const {userName, password} = req.body;

        const gym = await Gym.findOne({userName});


        if(gym && await bcrypt.compare(password,gym.password)){

            //  another way 
            // const hashedPassword = await bcrypt.compare(password,gym.password);

            const token = jwt.sign({gym_id:gym._id},process.env.JWT_SECRET_KEY);
            // console.log("jwtToken:",token);
             res.cookie("cookie-token",token,cookieOptions) ;

            res.json({
                message:"Logged in successfully!!",
                success:"true",
                gym,
                token
            })
        }else{
            res.status(400).json({error:"Invalid credentials"});
        }
    } catch (error) {
        // Added console for debug
        // console.log(error);
        
        res.status(500).json({
            
            error:"Server Error"
        })
    }
}



//  transportor function to send mail OTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587, // TLS port
  secure: false, // use SSL? false for port 587
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

//  otp sending function 

exports.sendOtp = async(req,res)=>{
    try {
        const {email} = req.body;
        const gym = await Gym.findOne({email});
        if(gym){
            const  buffer = crypto.randomBytes(4);   // get random bytes
            const token = buffer.readUInt32BE(0)%900000+100000; // modulo to get a 6-digit number 
            gym.resetPasswordToken=token;
            gym.resetPasswordExpires = Date.now()+3600000; // 1hr valid
            gym.save();
            //  for mail sending 
            const mailOptions={
                from : "samarpratapjnv046@gmail.com",
                to : email,
                subject:"Password Reset",
                text:`Hi ${gym.userName}

                      We received a request to reset your password.
                      This OTP will expire in 60 minutes.
                      If you didn’t request this, please ignore this email.
                      Your OTP is-
                      
                      ${token}.

                      Thank You 
                      [GymHunger Team]
                `
            };
            // usse of the transportor 
            transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                res.status(500).json({
                    error:"server error",
                    errorMsg : error
                })
            }else{
                res.status(200).json({
                    message:"OTP sent to your mail successfully"
                })
            }
        });

        }else{
            return res.status(404).json({error:"Gym not Found!!"});
        }
    } catch (error) {
        // Added console for debug
        // console.log(error);
        res.status(500).json({
            error : " server Error"
        })
    }
}

exports.checkOtp = async(req,res)=>{
    try {
        const  {email,otp} = req.body;
        const gym = await Gym.findOne({
            email,
            resetPasswordToken:otp,
            resetPasswordExpires:{$gt : Date.now()}
        });
        if(!gym){
            return res.status(400).json({
                error:"OTP is Invalid or has expired!"
            })
        }else{
            res.status(200).json({
                message:"OTP is successfully verified."
            })
        }

    } catch (error) {
       res.status(500).json({
         error : " server Error"
       }) 
    }
}


exports.resetPassword = async (req,res)=>{
    try {
        const {email,newPassword}=req.body;
        const gym = await Gym.findOne({email});
        if(!gym){
            return res.status(400).json({
                error:"Some technical Issue , Please try again later"
            })
        }
        const hashedPassword = await bcrypt.hash(newPassword,10);
        gym.password=hashedPassword;
        gym.resetPasswordToken= undefined;
        gym.resetPasswordExpires= undefined;
        await gym.save();
        res.status(200).json({
            message:"Password reset successfulyy!! "
        })
    } catch (error) {
        res.status(500).json({
         error : " server Error"
       }) 
    }
}

exports.logout = async()=>{
    res.clearCoockie('cookie-token',cookieOptions).json({
        message:'Logged out successfully !!'
    })
}