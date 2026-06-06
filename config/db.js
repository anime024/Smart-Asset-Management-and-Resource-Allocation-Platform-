const mongoose=require('mongoose');

async function connectMongoDb(){
    mongoose.connect(process.env.MONGO_DB_URI)
.then(()=>{
    console.log("mongoose connected succesully");
})
.catch((error)=>{
    console.log("error in connecting mongoose ",error)
}
)
}

module.exports={connectMongoDb};

