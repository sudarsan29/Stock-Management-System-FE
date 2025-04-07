
import { Link, useNavigate } from 'react-router-dom'
import { useState } from "react"
import axios from 'axios'
import { API_BASE_URL } from '../Config'
import Swal from "sweetalert2"
import './login.css'

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const signup = (ev) => {
        ev.preventDefault();
        setLoading(true);

        const requestData = { name, email, password }

        axios.post(`${API_BASE_URL}/signup`, requestData)
            .then((result) => {
                setLoading(false);
                Swal.fire({
                    icon: "success",
                    title: "Account Created Successfully"
                })
                navigate('/login');
            })
            .catch((error) => {
                setLoading(false);
                Swal.fire({
                    icon: "error",
                    title: error.response.data.error
                })
            })
    }

    return (
        <div className="container">
            <div className="row">
                    <div className="card shadow">
                        <div className="card-body">
                            {loading && <div className="text-center">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>}
                            <h4 className="card-title text-center">Register</h4>
                            <form onSubmit={signup}>
                                <div className='mb-3 mt-3'>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='form-control' placeholder='Name' />
                                </div>
                                <div className='mb-3'>
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='form-control' placeholder='Email' />
                                </div>
                                <div className='mb-3'>
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='form-control' placeholder='Password' />
                                </div>
                                <button type="submit" className='btn btn-dark'>Register</button>
                                <div className='mt-3 text-center'>
                                    <span className="text-muted">Already have an account?</span>
                                    <Link to="/login" className="ms-1 text-muted fw-bold">Login here</Link>
                                </div>
                            </form>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;
