import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    usedIn: { type: String, required: true },
    stock: { type: String, required: true },
    type: { type: String, required: true },
},
    { timestamps: true }
)

export default mongoose.model("Product", ProductSchema);
