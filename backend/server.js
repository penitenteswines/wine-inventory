require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const inventoryRoutes = require("./routes/inventory");
const ordersRoutes = require("./routes/orders");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/penitenteswines", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error al conectar con MongoDB:", err));

// Rutas
app.use("/inventory", inventoryRoutes);
app.use("/orders", ordersRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});