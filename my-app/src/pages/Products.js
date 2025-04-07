import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../Config';
import Swal from 'sweetalert2';
import './product.css';
import Navbar from '../components/Navbar';


const Products = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [itemSold, setItemSold] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [editProduct, setEditProduct] = useState(null);


  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${API_BASE_URL}/allProducts`, {
        headers: {
            Authorization: `Bearer ${token}`,
          },
      });
      setProducts(res.data.products);
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to fetch products', 'error');
    }
  };

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append('file', image);

    const res = await axios.post(`${API_BASE_URL}/uploadFile`, formData);
    return res.data.fileName;
};

  const handleAddProduct = async (e) => {
    e.preventDefault();
  
    if (!name || !quantity || !price) {
      Swal.fire('Warning', 'All fields are required!', 'warning');
      return;
    }
    let imageName = '';
    if (image) {
      imageName = await handleImageUpload();  // Upload image and get file name
    }
  
    const newProduct = { name, stockQuantity: quantity, price, category, itemSold, description, image: imageName };
  
    try {
      const token = localStorage.getItem('token');
  
      await axios.post(`${API_BASE_URL}/createProduct`, newProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      Swal.fire('Success', 'Product Added Successfully!', 'success');
      setName('');
      setQuantity('');
      setPrice('');
      setCategory('');
      setDescription('');
      setItemSold('');
      setImage(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to add product', 'error');
    }
  };
  
  const handleUpdate = async () => {
    if (!editProduct) {
      console.log("NO product selected for update");
      return;
    }
    const editProductData = {
      ...editProduct,
      name,
      stockQuantity: quantity,
      price,
      category,
      itemSold,
      description
    }
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${API_BASE_URL}/updateProduct/${editProduct._id}`, editProductData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      Swal.fire('Success', 'Product Updated Successfully!', 'success');
      setEditProduct(false);
      fetchProducts();
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to update product', 'error');
    }
  }

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${API_BASE_URL}/deleteProduct/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
        });
        fetchProducts();
        Swal.fire('Deleted!', 'Product has been deleted.', 'success');
      } catch (err) {
        console.error(err);
        Swal.fire('Error', 'Failed to delete product', 'error');
      }
    }
  };

  return (
    <div className='mt-3'>
    <Navbar />
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Manage Products</h2>

      {/* Add Product Form */}
      <form onSubmit={handleAddProduct} className="bg-white shadow-md p-6 rounded mb-10 grid gap-4">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="itemSold"
          value={itemSold}
          onChange={(e) => setItemSold(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        >
        </input>
        <button
          type="submit"
          className="bg-blue-600 text-black py-2 px-4 ms-5 rounded hover:bg-blue-700 transition"
        >
          Add Product
        </button>
      </form>

      {/* Products Grid */}
      {products.length === 0 ? (
        <p className="text-center text-gray-500">No Products Found!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-md mt-3 rounded p-4 flex flex-col justify-between hover:scale-105 transition"
            >
              <div>
              {product.image && (
                <img
                  src={`${API_BASE_URL}/files/${product.image}`}
                  alt={product.name}
                  style={{ width: '200px', height: '200px', objectFit: "cover" }}
                />
              )}
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-1">Quantity: {product.stockQuantity}</p>
                <p className="text-gray-600 mb-3">Price: ₹{product.price}</p>
                <p className="text-gray-600 mb-3">Category: {product.category}</p>
                <p className="text-gray-600 mb-3">ItemSold: {product.itemSold}</p>
                <p className="text-gray-600 mb-3">Description: {product.description}</p>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => {
                    setName(product.name);
                    setQuantity(product.stockQuantity);
                    setPrice(product.price);
                    setCategory(product.category);
                    setItemSold(product.itemSold);
                    setDescription(product.description);
                    setEditProduct(product);
                  }}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Edit
                </button>
                {editProduct && (
                  <button
                    type="button"
                    onClick={handleUpdate}
                    className="bg-green-600 text-white py-2 px-4 ms-3 rounded hover:bg-green-700 transition"
                  >
                    Update Product
                  </button>
                )}
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 text-white px-3 py-1 ms-5 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default Products;
