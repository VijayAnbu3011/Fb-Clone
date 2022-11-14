let User=require("../model/auth")
let bcrypt=require('bcryptjs')
const { Router } = require("express")


let updateData=async(req,res,next)=>{
    if(req.body.userId == req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                let salt=await bcrypt.genSalt(10)
                req.body.password=await bcrypt.hash(req.body.password,salt)
            }catch(err){
                next(err)
            }
        }
        try{
            let user=await User.findByIdAndUpdate(req.params.id,{
                $set:req.body
            })
            res.status(200).json("Account is updated")
        }catch(err){
            console.log(err);
            next(err)
        }
    }else{
        return res.status(404).json("You canot update ")
    }
}
let deleteData=async(req,res,next)=>{
    if(req.body.userId == req.params.id || req.body.isAdmin){
        try{
            let user=await User.findByIdAndDelete(req.params.id)
            res.status(200).json("Account Deleted")
        }catch(err){
            next(err)
        }
    }else{
        return res.status(404).json("You canot delete this account ")
    }
}
let getData=async(req,res,next)=>{ 
    const userId=req.query.userId
    const username=req.query.username
        try{
            let user= userId
            ? await User.findById(userId) :
            await User.findOne({username:username})
            let {password,updatedAt,...other}=user._doc
            res.status(200).json(other)
        }catch(err){
            next(err)
        }
    }
//  get friends
    let getFriend=async(req,res)=>{
        try{
            const user=await User.findById(req.params.userId)
            const friends=await Promise.all(
                user.following.map(friendId=>{
                    return User.findById(friendId)
                })
            )
            let friendList=[]
            friends.map(friend=>{
                const {_id,username,profilePicture}=friend
                friendList.push({_id,username,profilePicture})
            })
            res.status(200).json(friendList)
        }catch(err){
            res.status(500).json(err)
        }
    }
    let followData=async(req,res,next)=>{
        if(req.body.userId !== req.params.id){
            try{
                let user=await User.findById(req.params.id)
                let currentUser=await User.findById(req.body.userId)
                if( ! currentUser.following.includes(req.params.id)){
                    await user.updateOne({ $push: {followers: req.body.userId}})
                    await currentUser.updateOne({ $push: { following: req.params.id }})
                    res.status(200).json("User Ha ben followed")
                }else{
                    res.status(400).json("You are already following")
                }
            }catch(err){
                console.log(err);
                next(err)

            }
        }else{
            res.status(400).json("you can not follow yourself")
        }
    }

    let unfollowData=async(req,res,next)=>{
        if(req.body.userId !== req.params.id){
            try{
                let user=await User.findById(req.params.id)
                let currentUser=await User.findById(req.body.userId)
                if(  currentUser.following.includes(req.params.id)){
                    await user.updateOne({ $pull: {followers: req.body.userId}})
                    await currentUser.updateOne({ $pull: { following: req.params.id }})
                    res.status(200).json("User are unfollowed")
                }else{
                    res.status(400).json("You are already unfollowing")
                }
            }catch(err){
                console.log(err);
                next(err)

            }
        }else{
            res.status(400).json("you can not unfollow yourself")
        }
    }

module.exports={
    updateData,
    deleteData,
    getData,
    followData,
    unfollowData,
    getFriend
}