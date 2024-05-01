import React, { useState } from 'react'
import NavBar from "./NavBar.jsx";
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios';

export default function UserRegistration() {
    const [formData, setFormData] = useState({
        username:'',
        password: '',
        name: '',
        email: '',
        role: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevstate => ({
            ...prevstate,
            [name]:value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            fetch("http://localhost:8080/register", {

                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                    },
                    body:JSON.stringify(formData)

            }).then(res=>res.json()).then((result)=>{
                localStorage.setItem("token", result['token']);
                console.log(localStorage.getItem('token'));
                console.log(result['token']);
            })

//
//             const response = await axios.post('http://localhost:8080/register', formData);
//             console.log(response.data);
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };


    return(
    <div>
        <NavBar />

        <form method="POST">
            <div className="form-group">
                <label htmlFor="firstName">Name</label>
                <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <br />

            <div className="form-group">
                <label htmlFor="role">Role</label>
                <input type="text" className="form-control" id="role" name="role" value={formData.role} onChange={handleChange} />
            </div>
            <br />

            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" id="username" name="username" value={formData.username} onChange={handleChange} required />
            </div>
            <br />

            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <br />

            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <br />


            <input type="submit" onClick={handleSubmit}/>
        </form>
    </div>
    );
}

// //extract id
// import { GoogleCredentialResponse } from '../types';

// export function extractClientId(
//   credentialResponse: GoogleCredentialResponse,
// ): string | undefined {
//   const clientId =
//     credentialResponse?.clientId ?? credentialResponse?.client_id;
//   return clientId;