const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js') 
/* GET home page. */
router.post('/', authController.registerUser);

module.exports = router;
