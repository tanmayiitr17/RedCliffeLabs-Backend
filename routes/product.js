import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

//CREATE PRODUCT
router.post("/", async (req, res) => {
    const newProduct = new Product(req.body);
    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE PRODUCT
router.put("/:id", async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE PRODUCT
router.delete("/:id", async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("product has been deleted..");
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET PRODUCT
router.get("/find/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL REAGENTS
router.get("/reagents", async (req, res) => {
    try {
        const products = await Product.aggregate([
            {
                $match: {
                    type: "Reagent",
                },
            },
        ]);
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL REAGENTS
router.get("/analyzers", async (req, res) => {
    try {
        const products = await Product.aggregate([
            {
                $match: {
                    type: "Analyzer",
                },
            },
        ]);
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }
});



export default router;