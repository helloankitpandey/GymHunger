const Trainer = require("../Modals/trainer");

exports.getAllTrainer = async (req, res) => {
    try {
        const skip = parseInt(req.query.skip) || 0;
        const limit = parseInt(req.query.limit) || 9;

        const totalTrainers = await Trainer.countDocuments({ gym: req.gym._id });

        const trainers = await Trainer.find({ gym: req.gym._id })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            message: totalTrainers > 0 ? "Fetched Trainers Successfully" : "No Trainers Registered Yet!",
            trainers,
            totalTrainers
        });
    } catch (error) {
        console.error("getAllTrainer Error:", error);
        res.status(500).json({
            error: "Server Error"
        });
    }
};

exports.registerTrainer = async (req, res) => {
    try {
        const { name, mobileNo, address, profilePic } = req.body;
        const existingTrainer = await Trainer.findOne({ gym: req.gym._id, mobileNo: mobileNo });
        if (existingTrainer) {
            return res.status(409).json({ message: "Trainer Already Registered With this Mobile No" });
        }
        const newTrainer = new Trainer({ name, mobileNo, address, profilePic, gym: req.gym._id });
        await newTrainer.save();
        return res.status(200).json({ message: "Trainer Successfully Registered", newTrainer });
    } catch (error) {
        res.status(500).json({
            error: "Server Error"
        });
    }
};

exports.searchTrainer = async (req, res) => {
    try {
        const { searchTerm } = req.query;
        const trainers = await Trainer.find({
            gym: req.gym._id,
            $or: [
                { name: { $regex: '^' + searchTerm, $options: 'i' } },
                { mobileNo: { $regex: '^' + searchTerm, $options: 'i' } },
            ]
        });
        res.status(200).json({
            message: trainers.length > 0 ? "Fetched Trainers Successfully" : "No Trainers Registered Yet!",
            trainers,
            totalTrainers: trainers.length
        });
    } catch (error) {
        res.status(500).json({
            error: "Server Error"
        });
    }
};

exports.getTrainerDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const trainer = await Trainer.findOne({ _id: id, gym: req.gym._id });
        if (!trainer) {
            return res.status(400).json({
                error: "No Such Trainer"
            });
        }
        res.status(200).json({
            message: "Trainer Data Fetched",
            trainer: trainer
        });
    } catch (error) {
        res.status(500).json({
            error: "Server Error"
        });
    }
};
exports.changeStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const trainer = await Trainer.findOne({ _id: id, gym: req.gym._id });
        if (!trainer) {
             return res.status(400).json({
                error: "No Such Trainer"
            });
        }
        trainer.status = status;
        await trainer.save();
        res.status(200).json({
            message: "Status Changed Successfully"
        });
    } catch (error) {
        res.status(500).json({
            error: "Server Error"
        });
    }
};

exports.deleteTrainer = async (req, res) => {
    try {
        const { id } = req.params;
        const trainer = await Trainer.findOne({ _id: id, gym: req.gym._id });
        if (!trainer) {
            return res.status(400).json({
                error: "No Such Trainer"
            });
        }
        await Trainer.deleteOne({ _id: id, gym: req.gym._id });
        res.status(200).json({
            message: "Trainer Deleted Successfully"
        });
    } catch (error) {
        res.status(500).json({
            error: "Server Error"
        });
    }
};
