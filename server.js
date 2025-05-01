import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/api/auth.js';
import dentistsRoutes from './routes/api/dentists.js';
import appointmentRoutes from "./routes/api/appointments.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8080;
dotenv.config();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json({ extended: false }));

app.use("/api/auth", authRoutes);
app.use("/api/dentist", dentistsRoutes);
app.use("/api/appointments", appointmentRoutes);


app.listen(PORT, () => {
    console.log('Server is running in port ', PORT);
});