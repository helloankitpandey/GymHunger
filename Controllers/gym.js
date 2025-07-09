const Gym = require("../Modals/gym")





exports.register = async(req,res)=>{
    try {
        const {userName,password,gymName,profilePic,email}=req.body;

        
    } catch (error) {
        res.status(500).json({
            error:"Server Error"
        })
    }
}