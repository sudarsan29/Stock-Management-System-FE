import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove user from localstorage
        localStorage.removeItem("user");

        // Dispatch logout action to redux
        dispatch({ type: "LOGIN_ERROR" });

        // Navigate to Login Page
        navigate("/login");
    };

    return (
        <nav style={{ padding: '10px', background: '#333', color: 'white', display: 'flex', justifyContent: "space-between", borderRadius: "10px" }}>
            <h2>Stock Management</h2>
            <div>
            <Link to="/home">
                <button to="/" style={{ color: 'Black', marginLeft: "20px", marginRight: "150px", width: "100px", height: "40px", borderRadius: "10px" }}>Home</button>
            </Link>
            <Link to="/profile">
                <button  to="/profile" style={{ color: 'Black', marginRight: '150px', width: "100px", height: "40px", borderRadius: "10px" }}>Profile</button>
            </Link>
            <Link to="/products">
                <button  to="/products" style={{ color: 'Black', marginRight: '150px', width: "100px", height: "40px", borderRadius: "10px" }}>Products</button>
            </Link>
            <Link to="/stockOverview">
                <button to="/stock-overview" style={{ color: 'Black', marginRight: '150px', width: "150px", height: "40px", borderRadius: "10px" }}>Stock Overview</button>
            </Link>
                
               <button onClick={handleLogout} style={{ background: 'crimson', color: 'white', border: '10px', padding: '5px 10px', cursor: 'pointer' }}>
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
