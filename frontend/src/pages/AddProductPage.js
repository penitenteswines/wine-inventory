import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddProductPage() {
  const [product, setProduct] = useState({
    bodega: "",
    name: "",
    varietal: "",
    tipoDeVino: "",
    volumen: "",
    año: "",
    stock: "",
    costo: "",
    deposito: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/inventory", product);
      toast.success("Producto agregado exitosamente", {
        position: "top-center",
      });
      setTimeout(() => navigate("/"), 2000); // Redirigir después de 2 segundos
    } catch (error) {
      toast.error("Error al agregar el producto. Inténtalo de nuevo.", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Agregar Nuevo Producto</h2>
      <form onSubmit={handleSubmit} className="p-3 border rounded">
        <div className="mb-3">
          <label className="form-label">Bodega</label>
          <input
            type="text"
            className="form-control"
            name="bodega"
            value={product.bodega}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Varietal</label>
          <input
            type="text"
            className="form-control"
            name="varietal"
            value={product.varietal}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Tipo de Vino</label>
          <input
            type="text"
            className="form-control"
            name="tipoDeVino"
            value={product.tipoDeVino}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Volumen (ml)</label>
          <input
            type="number"
            className="form-control"
            name="volumen"
            value={product.volumen}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Año</label>
          <input
            type="number"
            className="form-control"
            name="año"
            value={product.año}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Stock</label>
          <input
            type="number"
            className="form-control"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Costo</label>
          <input
            type="number"
            className="form-control"
            name="costo"
            value={product.costo}
            onChange={handleChange}
            step="0.01"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Depósito</label>
          <input
            type="text"
            className="form-control"
            name="deposito"
            value={product.deposito}
            onChange={handleChange}
            required
          />
        </div>

        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">
            Guardar
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/")}
          >
            Cancelar
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default AddProductPage;