import express from 'express';
import 'dotenv/config';
import connectDB from './database/db.js';
import userRoute from './routes/userRoutes.js'
import authRoute from './routes/authRoutes.js'
import cors from 'cors'
import "./config/passport.js";

const app = express();   // express power usko app me dal diya 
const PORT = process.env.PORT || 3000;    // port --> server listen 

// middleware
app.use(express.json());

app.use(cors({
    origin:'http://localhost:5173',   // frontend url
    credentials: true,
}))

app.use('/api/v1/user', userRoute)
app.use('/auth', authRoute)


// http://localhost:8000/api/v1/user/register

app.listen(PORT,() => {
    connectDB();
    console.log(`server is listening at port: ${PORT}`);
})