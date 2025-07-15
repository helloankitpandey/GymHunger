const Member = require("../Modals/member");
const Membership = require('../Modals/membership')
exports.getAllMember = async (req, res) => {
    try {
        // Get pagination parameters from query, with defaults
        const skip = parseInt(req.query.skip) || 0;
        const limit = parseInt(req.query.limit) || 9;

        // Count total members for this gym
        const totalMembers = await Member.countDocuments({ gym: req.gym._id });

        // Fetch paginated members, sorted by latest createdAt
        const members = await Member.find({ gym: req.gym._id })
                                    .sort({ createdAt: -1 })
                                    .skip(skip)
                                    .limit(limit);

        res.status(200).json({
            message: totalMembers > 0 ? "Fetched Members Successfully" : "No Members Registered Yet!",
            members,
            totalMembers
        });
    } catch (error) {
        // console.error(error);
        res.status(500).json({
            error: "Server Error"
        });
    }
};

function addMonthsToDate(months,joiningDate){
    // get current year, month and date
    let today = joiningDate;
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();

    //  calculate new month and year 
    const futureMonth = currentMonth+months;
    const futureYear = currentYear+Math.floor(futureMonth/12);

    // calculate the correct future month
    const adjustedMonth = futureMonth % 12;
    // if(adjustedMonth===0){
    //     adjustedMonth=12;
    // }

    // set the date of the first of the future month 
    const futureDate = new Date(futureYear,adjustedMonth,1);

    //  get the last day of the future Month
    const lastDayofFutureMonth = new Date(futureYear,adjustedMonth+1,0).getDate();
     
    // adjust the day if current day exceeds the number of days in the new month exceeds

    const adjustDay = Math.min(currentDay,lastDayofFutureMonth);

    futureDate.setDate(adjustDay);
     return futureDate;
}

exports.registerMember= async(req,res)=>{
    try {
        const {name,mobileNo,address, membership,profilePic,joiningDate}=req.body;
        const member = await Member.findOne({gym:req.gym._id,mobileNo:mobileNo});
         if(member){
            return res.status(409).json({message:"Member Already Registered With this MobileNO"});
         }
         const memberShip = await Membership.findOne({gym:req.gym._id,_id:membership});
         const membershipMonth = memberShip.months;
         if(memberShip){
            let jngDate = new Date(joiningDate);
            const nextBillDate = addMonthsToDate(membershipMonth,jngDate);
            let newmember = new Member({name,mobileNo,address,membership,gym:req.gym._id,profilePic,nextBillDate});
            await newmember.save();
            return res.status(200).json({message:"Member Successfully Registered With this MobileNO",newmember});
         }else{
            return res.status(409).json({
                error:"No such Membership are there!"
            })
         }
    } catch (error) {
        // for debugging
        // console.log(error);
        
        res.status(500).json({
            error: "Server Error"
        });
    }
}


//  implementation of search functionality 

exports.searchMember = async(req,res)=>{
    try {
       const {searchTerm} = req.query;
       const member = await Member.find({gym:req.gym._id,
          $or:[{name:{$regex:'^'+searchTerm,$options:'i'}},
            {mobileNo:{$regex:'^'+searchTerm,$options:'i'}},
          ]
       });
        res.status(200).json({
            message: member.length > 0 ? "Fetched Members Successfully" : "No Members Registered Yet!",
            members:member,
            totalMembers:member.length
        });
    } catch (error) {
       res.status(500).json({
            error: "Server Error"
       }); 
    }
}




//   to fetch the users that  join in the current month 

exports.monthlyMember = async (req, res) => {
    try {
        const now = new Date();

        // Get first day of current month
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        // Get last day of current month
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

        // console.log("First day:", firstDayOfMonth, "End day:", endOfMonth);

        // Example: fetch members created in current month
        const members = await Member.find({
            gym: req.gym._id,
            createdAt: { $gte: firstDayOfMonth, $lte: endOfMonth }
        }).sort({createdAt:-1});

        res.status(200).json({
            message: "Fetched members for current month",
            members
        });
    } catch (error) {
        // console.error("Monthly Member Error:", error);
        res.status(500).json({
            error: "Server Error"
        });
    }
};



//  function to fetch the user those who are expired within the 3 days 
exports.expiringWithin3Days = async(req,res)=>{
    try{
        const today = new Date();
        const nextThreeDays = new Date();
        nextThreeDays.setDate(today.getDate()+3);
        const members = await Member.find({
            gym: req.gym._id,
            nextBillDate: { $gte: today, $lte: nextThreeDays }
        }).sort({createdAt:-1});
         res.status(200).json({
            message: members.length > 0 ? "Fetched Members Successfully" : "No Any member is Expired within 3 days !!",
            members:members,
            totalMembers:members.length
        });
    }catch (error) {
        res.status(500).json({
            error: "Server Error"
        });
    }
}

//  expire within 4-7 days 

exports.expiringWithin4To7Days = async(req,res)=>{
    try {
        const today = new Date();
        const nextfourDays = new Date();
        nextfourDays.setDate(today.getDate()+4);

        const nextSevenDays = new Date();
        nextSevenDays.setDate(today.getDate()+7);
        const members = await Member.find({
            gym: req.gym._id,
            nextBillDate: {
                 $gte: nextfourDays, // greater than or equal to 4 days from today
                  $lte: nextSevenDays }// lest tahn or equal to 7 days from today
        }).sort({createdAt:-1});
        res.status(200).json({
            message: members.length > 0 ? "Fetched Members Successfully" : "No Any member is Expired within 4-7 days !!",
            members:members,
            totalMembers:members.length
        });
    } catch (error) {
        res.status(500).json({
            error: "Server Error"
        });
    }
}


//  expired members 

exports.expiredMember = async( req,res)=>{
    try {
        const today = new Date();
        const members = await Member.find({gym:req.gym._id,status:"Active",
            nextBillDate:{
                $lt:today // less than today
            }
        })
         res.status(200).json({
            message: members.length > 0 ? "Fetched Members Successfully" : "No Any member has been Expired !!",
            members:members,
            totalMembers:members.length
        });
    } catch (error) {
        res.status(500).json({
            error: "Server Error"
        });
    }
}


// inactive members 

exports.inActiveMember = async(req,res)=>{
    try {
        const members = await Member.find({gym:req.gym._id,status:"Pending"});
        res.status(200).json({
            message: members.length > 0 ? "Fetched Members Successfully" : "No such member is Pending  !!",
            members:members,
            totalMembers:members.length
        });
    } catch (error) {
        res.status(500).json({
            error: "Server Error"
        }); 
    }
}



exports.getMemberDetails = async(req,res)=>{
    try {
        const {id}= req.params;
        const member = await Member.findById({_id:id,gym:req.gym._id});
        if(!member){
            return res.status(400).json({
                error:"No Such Member "
            })
        }
        res.status(200).json({
            message:"Member Data Fetched ",
            member:member
        })
    } catch (error) {
        res.status(500).json({
            error: "Server Error"
        });  
    }
}



exports.changeStatus = async(req,res)=>{
    try {
        const {id}= req.params;
        const {status}=req.body;
        const member = await Member.findById({_id:id,gym:req.gym._id});
        if(!member){
            return res.status(400).json({
                error:"No Such Member "
            })
        }
        member.status = status;
        await member.save();
        res.status(200).json({
            message: "Status Changed Successfully"
        })
    } catch (error) {
         res.status(500).json({
            error: "Server Error"
        });
    }
}



exports.updateMemberPlan = async(req,res)=>{
    try {
        const {membership} = req.body;
        const {id}= req.params;  
        const memberShip = await Membership.findOne({gym:req.gym._id,_id:membership});
        if(membership){
             let getMonth = memberShip.months;
             let today = new Date();
             let nextBillDate = addMonthsToDate(getMonth,today);
             const member  = await Member.findOne({gym:req.gym._id,_id:id});
             if(!member){
                return res.status(409).json({"error":"No such Member is there"});
             }
             member.nextBillDate=nextBillDate;
             member.lastPayment = today;
             await member.save();
             res.status(200).json({
                message: "Member Renewed   Successfully",
                member
             })
        }else{
            return res.status(409).json({"error":"No such membership are there"});
        }
    } catch (error) {
        res.status(500).json({
            error: "Server Error"
        }); 
    }
}
