import express from "express";
import api from './routes/index.js';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import cors from "cors";
import projectRoutes from './routes/projectRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

dotenv.config();
mongoose.connect(process.env.MONGODB_PATH, () => {
    console.log('connect');
}, (e) => console.log(e));

const PORT = process.env.SERVER_PORT || 9000;
const origin = process.env.CORS_ORIGIN || 'http://localhost:3000';

const app = express();

app.use(cors({
    origin
}));
app.use(express.json());
app.use(express.urlencoded());

app.use(api);
app.use('/projects', projectRoutes);
app.use('/tasks', taskRoutes);

app.listen(PORT, () => {
    console.log(`App is running in http://localhost:${PORT}`);
});
