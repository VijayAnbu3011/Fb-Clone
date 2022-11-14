const { urlencoded } = require("express")
let express=require("express")
let app=express()
require('dotenv').config()
let cors=require('cors')
require('./config/db')
const multer  = require('multer')
let path=require('path')


let authRoute=require('./routes/auth')
let userRoute=require('./routes/user')
let postRoute=require('./routes/posts')
let port=process.env.PORT || 8081
app.use('/images',express.static(path.join(__dirname, "public/images")))
// middleware
app.use(urlencoded({extended:true}))
// its body parser it parses the post request
app.use(express.json())
app.use(cors())
// const storage =multer.diskStorage({
//     destination: (req,file,cb)=>{
//         cb(null,"public/images/")
//     },
//     filename:(req,file,cb)=>{
//         cb(null,file.originalname)
//     }
// })
const upload=multer({ dest: 'public/images' })
app.post('/api/upload',upload.single('file'),(req,res)=>{
    try{
        return res.status(200).json("File Upload Successfully.")
    }catch(err){
        console.log(err);
    }
})

app.use('/auth',authRoute)
app.use('/user',userRoute)
app.use('/posts',postRoute)

app.use((err,req,res,next)=>{
    if(err){
        res.status(500).json({
            error:true,
            message:null,
            data:err
        })
    }
})
app.listen(port,()=>{
    console.log(`Listening to the PORT ${port}`);
})

