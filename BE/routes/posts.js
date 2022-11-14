let route=require('express').Router()
let postController=require("../controller/posts")



route.post('/',postController.createPost)
route.put('/:id',postController.updatePost)
route.delete('/:id',postController.deletePost)
route.put('/:id/like',postController.likePost)
route.get('/:id',postController.getPost)
route.get('/timeline/:userId',postController.timeLinePost)
route.get('/profile/:username',postController.userPost)

module.exports=route