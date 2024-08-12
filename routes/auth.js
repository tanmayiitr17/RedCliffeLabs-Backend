import express from "express";
import User from "../models/User.js";
import CryptoJS from "crypto-js";
import jwt from 'jsonwebtoken';

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
    console.log("first")
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SECRET
        ).toString(),
        contactNo: req.body.contactNo,
        address: req.body.address,
        role: req.body.role,
    });

    try {
        console.log("sec")
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return res.status(401).json("Wrong credentials!");
        console.log("user", user)
        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SECRET
        );
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        if (originalPassword !== req.body.password)
            return res.status(401).json("Wrong credentials!");

        const accessToken = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '3d' }
        );
        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken });
    } catch (err) {
        res.status(500).json(err);
    }
});

export default router;
