require('dotenv').config()


const express=require('express');
var session = require('express-session')
const {connectMongoDb}=require('./config/db')
const path=require('path')
const {authRouter}=require('./routes/authRoutes')
const {userRouter}=require('./routes/userRoutes')
const {adminRouter}=require("./routes/adminRoutes")
const {assetRouter} = require("./routes/assetRoutes");
const {bookingRouter}=require('./routes/bookingRoutes')


connectMongoDb();

const app=express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

console.log("SESSION_SECRET =", process.env.SESSION_SECRET);
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie:{maxAge:60*1000*10}
}))

const PORT=8000

app.use('/user',userRouter);
app.use('/admin',adminRouter);
app.use('/',authRouter)
app.use("/",assetRouter);
app.use("/booking",bookingRouter);


app.listen(PORT,()=>{
    console.log(`server started at http://localhost:${PORT}/`);
})

