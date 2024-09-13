const express = require('express');
const { signup, signin, google,signOut } = require('../controllers/authController.js'); // Destructure correctly

const router =express.Router();

router.post('/signup',signup)
router.post('/signin',signin)
router.post('/google',google)
router.get('/signOut',signOut)



module.exports =router;