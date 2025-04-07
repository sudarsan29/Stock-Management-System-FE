import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';

const ProfilePage = () => {
    const user = useSelector((state) => state.user.user) || {
        username: "Sai Krishna",
        email: "saikrishna@gmail.com"
    };

    return (
        <div>
            <Navbar />
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '90vh',
                flexDirection: 'column'
            }}>
                <h1 style={{ fontSize: '35px' }}>Profile Details</h1>

                {user ? (
                    <div style={{ marginTop: '20px', fontSize: '18px' }}>
                        <p><b>Name :</b> {user.name}</p>
                        <p><b>Email :</b> {user.email}</p>
                    </div>
                ) : (
                    <p style={{ marginTop: '20px' }}>No User Found! Please Login.</p>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
