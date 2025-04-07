import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../Config";
import Navbar from '../components/Navbar' 

const StockOverview = () => {
  const [stockData, setStockData] = useState(null);

  const fetchStockData = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/stockData`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setStockData(res.data);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to fetch stock data", "error");
    }
  };

  useEffect(() => {
    fetchStockData();
  }, []);

  if (!stockData) {
    return <h2>Loading Stock Data...</h2>;
  }

  return (
    <div style={{ 
      padding: "20px", 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      flexDirection: "column", 
    }}>
    <div style={{ padding: "20px" }} >
      <Navbar />
      <h1>Stock Overview</h1>

      <div style={{ marginTop: "20px" }}>
        <h3>Total Items Sold: {stockData.totalItemSold}</h3>
        <h3>Total Revenue: ₹ {stockData.totalRevenue}</h3>
      </div>

      <h2 style={{ marginTop: "30px" }}>Available Stock:</h2>
      <table border="1" cellPadding="10" style={{ marginTop: "10px" }}>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Available Stock</th>
            <th>Items Sold</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {stockData.products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.stockQuantity}</td>
              <td>{product.itemSold}</td>
              <td>₹ {product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default StockOverview;
