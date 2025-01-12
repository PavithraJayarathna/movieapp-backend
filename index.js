const express =require ('express');
const dotenv = require('dotenv');
const { default: mongoose } = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const MovieRouter = require('./routes/movie'); 

dotenv.config()
const UserRouter = require('./routes/user');

const app = express()
 app.use(express.json())
 app.use('/api', UserRouter)
 app.use('/api', MovieRouter); 
 app.use(cors({
    origin: ["http://localhost:7000"],
    credentials: true,
 }))
 app.use(cookieParser())


mongoose.connect('mongodb+srv://madumalijayarathna09:Chanmadu@cluster0.ekd0ilq.mongodb.net/movieapp?retryWrites=true&w=majority&appName=Cluster0')

app.listen(process.env.PORT, () =>{
    console.log("Server is Running ON ",process.env.PORT);

    
})
   

