const express = require("express");
const auth = require("../Auth/auth");
const MembershipController = require('../Controllers/membership');

const router = express.Router();

router.post('/add-membership',auth,MembershipController.addMembership);


module.exports = router ;
