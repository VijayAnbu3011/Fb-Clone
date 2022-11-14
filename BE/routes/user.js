let express=require("express")
let route=express.Router()
let userController=require("../controller/users")

// update 
route.put('/:id',userController.updateData)
route.delete('/:id',userController.deleteData)
route.get('/',userController.getData)
route.put('/:id/follow',userController.followData)
route.put('/:id/unfollow',userController.unfollowData)
route.get('/friends/:userId',userController.getFriend)

module.exports=route