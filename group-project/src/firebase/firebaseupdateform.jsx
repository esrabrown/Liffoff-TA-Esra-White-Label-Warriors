import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import NavBar from '../components/NavBar';

function ProfileUpdateForm() {
    const { currentUser } = useAuth();
    const [username, setUsername] = useState('');
    const [defaultCurrency, setDefaultCurrency] = useState('');

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            //update user profile in firebase
            await currentUser.updateProfile({ //claim or property?
                displayName: username,
                defaultCurrency: defaultCurrency
            });
            //redirect to the home page after updating profile
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
    <>
    <NavBar />
        <div>
            <h2>Update Your Profile</h2>
            <br></br>
            <form onSubmit={handleProfileUpdate}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input className="form-control" type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <br></br>
                <div>
                    <label htmlFor="defaultCurrency">Default Currency:</label>
                    <input className="form-control" type="text" id="defaultCurrency" value={defaultCurrency} onChange={(e) => setDefaultCurrency(e.target.value)} />
                </div>
                <br></br>
                <br></br>
                <button type="submit" className="btn btn-primary btn-lg">Update Profile</button>
            </form>
        </div>
        </>
    );
}

export default ProfileUpdateForm;