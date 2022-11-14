const User=require('../model/auth')
let Posts=require('../model/posts')

let createPost=async(req,res,next)=>{
    let newPost=new Posts(req.body)
    try{
        let savePost=await newPost.save()
        res.status(200).json(savePost)
    }catch(err){
        console.log(err);
        next(err)
    }
}
let updatePost=async(req,res,next)=>{
    try{
        let post=await Posts.findById(req.params.id)
        if(post.userId == req.body.userId){
            await post.updateOne({$set:req.body})
            res.status(200).json("the post has been updated")
        }else{
            res.status(404).json("you can update only your post")
        }
    }catch(err){
        console.log(err);
        next(err)
    }
}
let deletePost=async(req,res,next)=>{
    try{
        let post=await Posts.findById(req.params.id)
        if(post.userId == req.body.userId){
            await post.deleteOne()
            res.status(200).json("the post deleted")
        }else{
            res.status(404).json("you can delete only your post")
        }
    }catch(err){
        console.log(err);
        next(err)
    }
}
let likePost=async(req,res,next)=>{
    try{
        let post=await Posts.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push :{likes:req.body.userId}})
            res.status(200).json("Post is Liked")
        }
        else{
            await post.updateOne({ $pull: { likes:req.body.userId}})
            res.status(200).json("Post is disLiked")
        }
    }catch(err){
        next(err)
    }
}
let getPost=async(req,res,next)=>{
    try{
        let post=await Posts.findById(req.params.id)
        res.status(200).json(post)
    }catch(err){
        next(err)
    }
}
let timeLinePost=async(req,res,next)=>{
    try{
        const currentUser=await User.findById(req.params.userId)
        const userPost=await Posts.find({userId: currentUser._id})
        const friendPosts= await Promise.all(
            currentUser.following.map((friendId)=>{
                return Posts.find({userId: friendId})
            })
        )
        res.status(200).json(userPost.concat(...friendPosts))
    }catch(err){
        console.log(err);
        next(err)
    }
}
let userPost=async(req,res,next)=>{
    try{
        const user=await User.find({username : req.params.username})
        console.log(user);
        const posts=await Posts.find({ userId: user._id})
        res.status(200).json(posts)
    }catch(err){
        console.log(err);
        next(err)
    }
}

module.exports={
    createPost,
    updatePost,
    deletePost,
    likePost,
    getPost,
    timeLinePost,userPost
}