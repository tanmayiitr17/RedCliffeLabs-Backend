import mongoose from "mongoose";

const Product = new mongoose.Schema({
    name: { type: String, required: true },
    usedIn: { type: String, required: true },
    stock: { type: String, required: true },
    type: { type: String, required: true },
},
    { timestamps: true }
)

export default Product = mongoose.model("Product", ProductSchema);