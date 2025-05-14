const express = require('express');
const router = express.Router();
const Item = require('../models/Item'); // Importa el modelo de MongoDB

// Ruta para valorizar el inventario
router.get('/', async (req, res) => {
    try {
        const items = await Item.find();

        // Calcular valores del inventario
        const totalStock = items.reduce((acc, item) => acc + item.stock, 0);
        const totalCost = items.reduce((acc, item) => acc + item.stock * item.costo, 0);

        res.json({
            totalStock,
            totalCost,
            itemsCount: items.length, // Cantidad de productos únicos
        });
    } catch (error) {
        console.error('Error al valorizar el inventario:', error);
        res.status(500).json({ error: 'Error al valorizar el inventario' });
    }
});

module.exports = router;