const express = require('express');
const {createListing,getListings, deleteListing,updateListing,fetchListing}= require('../controllers/listingController.js');
const verifyToken = require('../utils/verifyUser.js');


const router = express.Router();



router.post('/create',verifyToken,createListing);
router.delete('/delete/:id',verifyToken,deleteListing);
router.post('/update/:id',verifyToken, updateListing);
router.get('/get/:id',fetchListing);
router.get('/get',getListings)
module.exports = router;