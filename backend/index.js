import express from 'express';
import dotenv from "dotenv";
dotenv.config();
import { db } from './Config/db.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRouter from './Routes/AuthRouter.js';
import productRouter from './Routes/ProductRouter.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get('/test', (req, res) => {
    res.send("Hello !! Hello !! Testinggggggggg");
});

app.use("/auth", userRouter);
app.use("/products", productRouter);

// Start server only after DB connection
const startServer = async () => {
    const dbConnected = await db();
    if (dbConnected) {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } else {
        console.log("Failed to connect to database. Server not started.");
    }
};

startServer();