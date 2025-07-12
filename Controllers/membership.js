const Membership = require("../Modals/membership")

exports.addMembership = async(req,res)=>{
    try {
        const {months, price} = req.body;
        const memberShip = await Membership.findOne({gym:req.gym._id,months});
        if(memberShip){
            memberShip.price = price;
            await memberShip.save();
            res.status(200).json({
                message:"Updated successfully"
            })
        }else{
            const newMembership = new Membership({
                price,
                months,
                gym:req.gym._id
            });
            await newMembership.save();
            res.status(200).json({
                message : "Added Successfully !"
            })
        }
    } catch (error) {
        res.status(500).json({
            error:"Server Error"
        })
    }
}



//  for get all the memberships 

exports.getMembership = async(req,res)=>{
    try {
        const loggedInId = req.gym._id;
        const memberShip= await Membership.find({gym:loggedInId});
        // this line fetch all the memberships which are created with login Id 
        res.status(200).json({
            message : "Membership fetched  Successfully !",
            membership :memberShip
        })
    } catch (error) {
        res.status(500).json({
            error:"Server Error"
        })
    }
}