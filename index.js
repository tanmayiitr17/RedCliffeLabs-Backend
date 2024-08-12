import express from 'express';
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors'
import authRoute from "./routes/auth.js";
import productRoute from "./routes/product.js";

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

app.use("/auth", authRoute);
app.use("/product", productRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});