let user=require('../model/auth')
let bcrypt=require('bcryptjs')




let postData=async(req,res,next)=>{
    let {username,password,email}=req.body
    try{
        // hasing password
        let salt=await bcrypt.genSalt(10)
        let hashedPasword=await bcrypt.hash(password,salt)
        // Register
         await user.insertMany({username,password:hashedPasword,email})
        //  sengin response
         res.status(200).json({
             error:false,
             message:"Posted Sucessfully",
             data:{username,hashedPasword,email}
         })
    }catch(err){
        next(err)
    }
}

let loginUser= async (req,res,next)=>{
    try{
       let validEmail= await user.findOne( {email:req.body.email} ).lean()
       if(validEmail){
            let validpassword= await bcrypt.compare( req.body.password , validEmail.password)
            if(validpassword){
                res.status(200).json({
                    error:false,
                    message:"Login Sucessfully",
                    data:validEmail
                })
            }else{
                res.status(404).json({
                    error:true,
                    message:"Enter Valid password"
                })
            }
       }else{
        res.status(404).json({
            error:true,
            message:"Enter Valid mail Id"
        })
       }
    }catch(err){
        next(err);
    }
}
module.exports={
    postData,
    loginUser
}