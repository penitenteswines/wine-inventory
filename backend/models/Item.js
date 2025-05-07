const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // Importar uuid

const itemSchema = new mongoose.Schema({
    id: { type: String, default: uuidv4, unique: true }, // Generar un UUID único por defecto
    name: { type: String, required: true },
    bodega: { type: String, required: true },
    marca: { type: String, required: true },
    varietal: { type: String, required: true },
    tipoDeVino: { type: String, required: true },
    volumen: { type: Number, required: true },
    año: { type: Number, required: true },
    stock: { type: Number, required: true }
});

module.exports = mongoose.model('Item', itemSchema);