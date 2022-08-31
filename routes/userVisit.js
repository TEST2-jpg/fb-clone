const express = require('express');
const router = express.Router();
const visitUserController = require('../controllers/visitUserController')

router.get('/', (req, res) => {
    res.send('h1')
});

router.get('/:userId', visitUserController.getFeed)

module.exports = router;
