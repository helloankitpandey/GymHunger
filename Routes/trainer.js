const express = require("express");
const router = express.Router();
const TrainerController = require('../Controllers/trainer');
const auth = require("../Auth/auth");

router.get('/all-trainer', auth, TrainerController.getAllTrainer);
router.post('/register-trainer', auth, TrainerController.registerTrainer);

router.get('/searched-trainer', auth, TrainerController.searchTrainer);

router.get('/get-trainer/:id', auth, TrainerController.getTrainerDetails);
router.post('/change-status/:id', auth, TrainerController.changeStatus);

router.delete('/delete-trainer/:id', auth, TrainerController.deleteTrainer);

module.exports = router;
