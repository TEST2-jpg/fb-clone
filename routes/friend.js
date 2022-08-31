const express = require('express');
const router = express.Router();
const friendController = require('../controllers/friendController.js') 

router.post('/addFriend', friendController.addFriend );

router.get('/:uId/:friendId', friendController.getAddFriendStatus )

router.post('/undoRequest', friendController.undoRequest );

router.post('/acceptRequest', friendController.acceptRequest)

module.exports = router;
