require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose'); // Declaración única
const cors = require('cors');
const Item = require('./models/Item');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Middleware global para manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo salió mal en el servidor' });
});

// Conexión a MongoDB
// Reemplaza <username>, <password>, y <cluster-url> con los valores de tu Atlas
const MONGO_URI = 'mongodb+srv://penitenteswines:Penitentes+7412374123@inventory.8ma9uuz.mongodb.net/?retryWrites=true&w=majority&appName=inventory';

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000 // Opcional: ajusta el tiempo de espera del servidor
})
    .then(() => console.log('Conectado a MongoDB Atlas'))
    .catch(err => console.error('Error al conectar con MongoDB Atlas:', err));

// Rutas de Inventario
// Obtener todos los artículos
app.get('/inventory', async (req, res) => {
    const items = await Item.find();
    res.json(items);
});

// Agregar un nuevo artículo
app.post('/inventory', async (req, res) => {
    try {
        const newItem = new Item(req.body);
        await newItem.save();
        res.json({ message: 'Artículo agregado exitosamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Eliminar un artículo
app.delete('/inventory/:id', async (req, res) => {
    try {
        await Item.deleteOne({ id: req.params.id });
        res.json({ message: 'Artículo eliminado exitosamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Obtener artículos con stock bajo
app.get('/inventory/low-stock', async (req, res) => {
    const threshold = parseInt(req.query.threshold) || 5;
    const lowStockItems = await Item.find({ stock: { $lt: threshold } });
    res.json(lowStockItems);
});

// **Nuevas Rutas**
// Actualizar un artículo existente
app.put('/inventory/:id', async (req, res) => {
    try {
        const updatedItem = await Item.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true, runValidators: true } // Validar antes de guardar
        );
        if (!updatedItem) {
            return res.status(404).json({ message: 'Artículo no encontrado' });
        }
        res.json({ message: 'Artículo actualizado exitosamente', item: updatedItem });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Buscar artículos por ID o nombre
app.get('/inventory/search', async (req, res) => {
    const { id, name } = req.query;
    try {
        const filter = {};
        if (id) filter.id = id;
        if (name) filter.name = new RegExp(name, 'i'); // Búsqueda por coincidencia parcial (case-insensitive)

        const items = await Item.find(filter);
        if (items.length === 0) {
            return res.status(404).json({ message: 'No se encontraron artículos' });
        }
        res.json(items);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});