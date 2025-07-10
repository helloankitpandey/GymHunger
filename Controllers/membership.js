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