const express = require("express");
const router = express.Router();

const GymController = require('../Controllers/gym'); // ✅ Single import
const auth = require("../Auth/auth"); // ✅ Auth middleware

// Public Routes
router.post('/register', GymController.register);
router.post('/login', GymController.login);
router.post('/reset-password/sendOtp', GymController.sendOtp);
router.post('/reset-password/checkOtp', GymController.checkOtp);
router.post('/reset-password', GymController.resetPassword);
router.post('/logout', GymController.logout);

// Protected Route (requires authentication)
router.put('/update-gym-profile-pic/:id', auth, GymController.updateGymProfilePic);

module.exports = router;
