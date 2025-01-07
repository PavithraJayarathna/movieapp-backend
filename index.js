const express =require ('express');
const dotenv = require('dotenv');
const { default: mongoose } = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

dotenv.config()
const UserRouter = require('./routes/user');

const app = express()
 app.use(express.json())
 app.use('/api', UserRouter)
 app.use(cors({
    origin: ["http://localhost:7000"],
    credentials: true,
 }))
 app.use(cookieParser())


mongoose.connect('mongodb://127.0.0.1:27017/movieapp')

app.listen(process.env.PORT, () =>{
    console.log("Server is Running ON ",process.env.PORT);

    
})
   

