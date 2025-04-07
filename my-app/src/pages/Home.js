// Home.js

import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Navbar from '../components/Navbar'

const Home = () => {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user")); // fetching user data

    const logout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to logout!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#000',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Logout'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("user");
                navigate("/login");
            }
        })
    }

    return (
        <div>
            <Navbar />
        <div className='container mt-5'>
            <div className="d-flex justify-content-between align-items-center">
                <h3>Welcome {user?.name} 🎉</h3>
                <button className="btn btn-dark" onClick={logout}>Logout</button>
            </div>

            <hr />

            <div className='text-center mt-5'>
                <h1>Dashboard Home Page</h1>
                <p>This is your Stock Management System Homepage 🚀</p>
            </div>
        </div>
        </div>
    )
}

export default Home;
