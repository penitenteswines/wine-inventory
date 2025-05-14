const express = require('express');
const router = express.Router();
const Item = require('../models/Item'); // Importa el modelo de MongoDB

// Obtener todos los artículos con búsqueda y paginación
router.get('/', async (req, res) => {
    const { search, page = 1, limit = 10 } = req.query;

    try {
        const query = {};

        // Búsqueda en múltiples campos
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { bodega: { $regex: search, $options: 'i' } },
                { varietal: { $regex: search, $options: 'i' } },
                { tipoDeVino: { $regex: search, $options: 'i' } },
                { deposito: { $regex: search, $options: 'i' } }, // Buscar por depósito también
            ];
        }

        // Paginación
        const skip = (page - 1) * limit;
        const items = await Item.find(query).skip(skip).limit(parseInt(limit));
        const total = await Item.countDocuments(query);

        res.json({ items, total });
    } catch (error) {
        console.error('Error al obtener los artículos:', error);
        res.status(500).json({ error: 'Error al obtener los artículos' });
    }
});

// Obtener un producto por ID
router.get('/:id', async (req, res) => {
    try {
        const item = await Item.findOne({ _id: req.params.id }); // Cambiado `id` por `_id` porque MongoDB usa `_id`
        if (!item) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(item);
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
});

// Agregar un nuevo artículo
router.post('/', async (req, res) => {
    const { bodega, name, varietal, tipoDeVino, volumen, año, stock, costo, deposito } = req.body;

    // Validaciones para campos obligatorios
    if (!bodega || !name || !varietal || !tipoDeVino || !volumen || !año || stock == null || costo == null || !deposito) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    try {
        const newItem = new Item(req.body);
        await newItem.save();
        res.status(201).json({ message: 'Artículo agregado exitosamente', item: newItem });
    } catch (error) {
        console.error('Error al agregar el artículo:', error);
        res.status(500).json({ error: 'Error al agregar el artículo' });
    }
});

// Actualizar un artículo
router.put('/:id', async (req, res) => {
    const { bodega, name, varietal, tipoDeVino, volumen, año, stock, costo, deposito } = req.body;

    // Validaciones para campos obligatorios
    if (!bodega || !name || !varietal || !tipoDeVino || !volumen || !año || stock == null || costo == null || !deposito) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    try {
        const updatedItem = await Item.findOneAndUpdate(
            { _id: req.params.id },
            { bodega, name, varietal, tipoDeVino, volumen, año, stock, costo, deposito },
            { new: true, runValidators: true }
        );
        if (!updatedItem) {
            return res.status(404).json({ message: 'Artículo no encontrado' });
        }
        res.json({ message: 'Artículo actualizado exitosamente', item: updatedItem });
    } catch (error) {
        console.error('Error al actualizar el artículo:', error);
        res.status(500).json({ error: 'Error al actualizar el artículo' });
    }
});

// Eliminar un artículo
router.delete('/:id', async (req, res) => {
    try {
        const result = await Item.deleteOne({ _id: req.params.id }); // Cambiado `id` por `_id`
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Artículo no encontrado' });
        }
        res.json({ message: 'Artículo eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar el artículo:', error);
        res.status(500).json({ error: 'Error al eliminar el artículo' });
    }
});

module.exports = router;