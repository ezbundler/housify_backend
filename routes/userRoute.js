const express = require('express');
const  { userController, userInfoUpdate ,deleteUser} = require('../controllers/userController.js');
const verifyToken = require('../utils/verifyUser.js');


const router = express.Router();

router.get('/test',userController);
router.post('/update/:id',verifyToken, userInfoUpdate);
router.delete('/delete/:id',verifyToken,deleteUser);


module.exports = router;