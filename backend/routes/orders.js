const express = require("express");
const router = express.Router();
const Order = require("../models/Order"); // Asegúrate de que esta importación sea correcta

// Ruta para crear un pedido
router.post("/", async (req, res) => {
  try {
    const { products } = req.body;

    // Verificar que la lista de productos no esté vacía
    if (!products || products.length === 0) {
      return res.status(400).json({ error: "La lista de productos no puede estar vacía." });
    }

    // Calcular el total de unidades y el precio total
    const totalUnits = products.reduce((acc, product) => acc + product.quantity, 0);
    const totalPrice = products.reduce((acc, product) => acc + product.quantity * product.price, 0);

    // Crear el pedido
    const newOrder = new Order({
      products,
      totalUnits,
      totalPrice,
    });

    // Guardar el pedido en la base de datos
    await newOrder.save();

    res.status(201).json({ message: "Pedido creado exitosamente", order: newOrder });
  } catch (error) {
    console.error("Error al crear el pedido:", error); // Log para depurar el problema
    res.status(500).json({ error: "Error al crear el pedido" });
  }
});

module.exports = router;