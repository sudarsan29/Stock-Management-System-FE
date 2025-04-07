import React, { useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../Config';  

const ProductForm = () => {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    name: "",
    quantity: "",
    price: "",
    description: "",
  });

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios.post(`${API_BASE_URL}/addProducts`, productData)
      .then((res) => {
        if (res.status === 201) {
          setLoading(false);
          Swal.fire({
            icon: "success",
            title: "Product Added Successfully!"
          });
          navigate('/productlist');
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: error.response.data.error || "Something Went Wrong!"
        });
      });
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        onChange={handleChange}
      ></textarea>

      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Product"}
      </button>
    </form>
  );
};

export default ProductForm;
