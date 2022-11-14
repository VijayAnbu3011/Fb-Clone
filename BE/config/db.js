let mongoose=require('mongoose')


module.exports.connectDb=mongoose.connect(process.env.DB_URL,{
    useNewUrlParser:true,
    useUnifiedtopology:true
},(err)=>{
    if(!err){
        console.log(`DB connected Sucessfully`);
    }else{
        console.log('Db not connected');
    }
})