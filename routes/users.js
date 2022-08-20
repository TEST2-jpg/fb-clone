var express = require('express');
var router = express.Router();
const postController = require('../controllers/postController')
const homeController = require('../controllers/homeController')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/posts/:postId/postStat', postController.postStats)

router.post('/:userId/posts/', postController.createPost)

router.get('/:userId', homeController.getUserInfo)

router.delete('/:userId/posts/:postId', postController.deletePost)

router.get('/:userId/posts/:postId', postController.getPostsComment)

router.post('/:userId/posts/:postId/comments', postController.postComment)

router.get('/:userId/posts/:postId/like', postController.likePost)

router.get('/:userId/posts/:postId/unlike', postController.unlikePost)


module.exports = router;
