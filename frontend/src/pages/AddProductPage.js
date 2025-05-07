import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddProductPage() {
  const [product, setProduct] = useState({
    name: "",
    bodega: "",
    marca: "",
    varietal: "",
    tipoDeVino: "",
    volumen: "",
    año: "",
    stock: "",
  });

  const navigate = useNavigate();

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/inventory", product);
      alert("Producto agregado exitosamente");
      navigate("/");
    } catch (error) {
      alert("Error al agregar el producto");
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Agregar Nuevo Producto</h2>
      <form onSubmit={handleSubmit}>
        {/* Campo Nombre */}
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

        {/* Campo Bodega */}
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

        {/* Campo Marca */}
        <div className="mb-3">
          <label className="form-label">Marca</label>
          <input
            type="text"
            className="form-control"
            name="marca"
            value={product.marca}
            onChange={handleChange}
            required
          />
        </div>

        {/* Campo Varietal */}
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

        {/* Campo Tipo de Vino */}
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

        {/* Campo Volumen */}
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

        {/* Campo Año */}
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

        {/* Campo Stock */}
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

        {/* Botón para agregar producto */}
        <button type="submit" className="btn btn-primary">
          Agregar Producto
        </button>
      </form>
    </div>
  );
}

export default AddProductPage;