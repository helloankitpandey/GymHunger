const express = require("express");
const GymController = require('../Controllers/gym');

const router = express.Router();

router.post('/register',GymController.register);


module.exports = router ;