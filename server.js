import express from 'express';
import 'dotenv/config';
import connectDB from './database/db.js';
import userRoute from './routes/userRoutes.js'

const app = express();   // express power usko app me dal diya 
const PORT = process.env.PORT || 3000;    // port --> server listen 

// middleware
app.use(express.json());

app.use('/api/v1/user',userRoute)

// http://localhost:8000/api/v1/user/register

app.listen(PORT,() => {
    connectDB();
    console.log(`server is listening at port: ${PORT}`);
})