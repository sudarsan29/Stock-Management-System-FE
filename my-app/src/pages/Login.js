import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from'axios';
import './login.css';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { API_BASE_URL } from '../Config';


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = (ev) => {
        ev.preventDefault();
        setLoading(true);
        const requestData = { email: email, password }
        axios.post(`${API_BASE_URL}/login`, requestData)
            .then((result) => {
                if (result.status === 201) {
                    setLoading(false);
                    localStorage.setItem("token", result.data.result.token);
                    localStorage.setItem('user', JSON.stringify(result.data.result.user));
                    dispatch({ type: 'LOGIN_SUCCESS', payload: result.data.result.user });
                    setLoading(false);
                    navigate('/Home');
                }
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                Swal.fire({
                    icon: "error",
                    title: error.response.data.error
                })
            })
        }

return (
    <div>
    <div className="container">
            <div className="row">
                <div className="card shadow">
                    <div className="card-body">
                        {loading && (
                            <div className="text-center mb-3">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        )}
                            <h4 className="text-center mb-4">Login</h4>
                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="form-control"
                                        placeholder="Email"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="form-control"
                                        placeholder="Password"
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-dark w-100">
                                    Login
                                </button>
                                <div className="mt-3 text-center">
                                    <span className="text-muted">Don't have an account?</span>
                                    <Link to="/Register" className="ms-2 fw-bold text-muted">
                                        Signup here
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                
            </div>
        </div>
        </div>
)}


export default Login;