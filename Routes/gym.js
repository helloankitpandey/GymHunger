const express = require("express");
const GymController = require('../Controllers/gym');

const router = express.Router();

router.post('/register',GymController.register);
router.post('/login',GymController.login);
router.post('/reset-password/sendOtp',GymController.sendOtp);
router.post('/reset-password/checkOtp',GymController.checkOtp);
router.post('/reset-password',GymController.resetPassword);


module.exports = router ;