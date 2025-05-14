const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const itemSchema = new mongoose.Schema({
    bodega: { type: String, required: true },
    name: { type: String, required: true },
    varietal: { type: String, required: true },
    tipoDeVino: { type: String, required: true },
    volumen: { type: Number, required: true },
    año: { type: Number, required: true },
    stock: { type: Number, required: true },
    costo: { type: Number, required: true, default: 0 },
    deposito: { type: String, required: true },
    id: { type: String, unique: true, default: uuidv4 },
});

// Middleware para convertir strings a mayúsculas antes de guardar
itemSchema.pre('save', function (next) {
    this.bodega = this.bodega.toUpperCase();
    this.name = this.name.toUpperCase();
    this.varietal = this.varietal.toUpperCase();
    this.tipoDeVino = this.tipoDeVino.toUpperCase();
    this.deposito = this.deposito.toUpperCase();
    next();
});

// Middleware para convertir strings a mayúsculas al actualizar
itemSchema.pre('findOneAndUpdate', function (next) {
    if (this._update.bodega) this._update.bodega = this._update.bodega.toUpperCase();
    if (this._update.name) this._update.name = this._update.name.toUpperCase();
    if (this._update.varietal) this._update.varietal = this._update.varietal.toUpperCase();
    if (this._update.tipoDeVino) this._update.tipoDeVino = this._update.tipoDeVino.toUpperCase();
    if (this._update.deposito) this._update.deposito = this._update.deposito.toUpperCase();
    next();
});

module.exports = mongoose.model('Item', itemSchema);