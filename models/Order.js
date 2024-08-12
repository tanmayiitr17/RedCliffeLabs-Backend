import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    usedIn: { type: String, required: true },
    quantity: { type: String, required: true },
    pricePerItem: { type: String, required: true },
    type: { type: String, required: true },
    address: { type: String, required: true },
    status: { type: String, required: true, default: "In Progress" },
    shipperId: { type: String, required: true },
    paymentId: { type: String, required: true },
},
    { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
