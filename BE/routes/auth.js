const { Router } = require("express")
let express=require("express")
let route=express.Router()
let userController=require('../controller/auth')

route.post("/register",userController.postData)
route.post('/login',userController.loginUser)


module.exports=route