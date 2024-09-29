const express = require('express');
const  { getUserListings,userController,getUser, userInfoUpdate ,deleteUser} = require('../controllers/userController.js');
const verifyToken = require('../utils/verifyUser.js');


const router = express.Router();

router.get('/test',userController);
router.post('/update/:id',verifyToken, userInfoUpdate);
router.delete('/delete/:id',verifyToken,deleteUser);
router.get('/listings/:id',verifyToken, getUserListings)
router.get('/:id',verifyToken,getUser);
module.exports = router;