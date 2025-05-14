const mongoose = require("mongoose");

// Esquema para los productos en la orden
const productSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

// Esquema de la orden
const orderSchema = new mongoose.Schema({
  products: [productSchema], // Lista de productos en la orden
  totalUnits: { type: Number, required: true }, // Cantidad total de unidades
  totalPrice: { type: Number, required: true }, // Precio total del pedido
  createdAt: { type: Date, default: Date.now }, // Fecha de creación
});

// Modelo de datos para las órdenes
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;