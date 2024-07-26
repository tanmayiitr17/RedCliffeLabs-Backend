import express from 'express';
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import cors from 'cors'

const app = express();
dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("DB Connected successfully!");
    })
    .catch((err) => {
        console.log("Error in connecting with DB", err);
    });


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>Hello, Express.js Server!</h1>');
});

app.use("auth", authRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});