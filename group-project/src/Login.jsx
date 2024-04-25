import React, { useState } from 'react';
import axios from 'axios';
import NavBar from './components/NavBar';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'
import { useGoogleLogin, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/login', formData);
            localStorage.setItem("token", response.data.token);
            console.log(localStorage.getItem('token'));
            navigate("/")
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const responseMessage = (response) => {
        console.log(response);
    };
    const errorMessage = (error) => {
        console.log(error);
    };

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });
    // axios.interceptors.request.use(config => {
    //     if (config.method === 'post' || config.method === 'put' || config.method === 'delete') {
    //       // Only send the token to relative URLs i.e. locally.
    //       config.headers['X-XSRF-TOKEN'] = Cookies.get('XSRF-TOKEN');
    //     }
    //     return config;
    //   });
// added
    // const handleGoogleLogin = async () => {
    //   try {
    //     // Make a request to the backend server to initiate the Google OAuth2 flow
    //     const response = await axios.get('/auth/google');
    //     window.location.href = response.data.redirectUrl;
    //   } catch (error) {
    //     console.error('Error initiating Google login:', error);
    //   }
    // };
// added
    // const handleFacebookLogin = async () => {
    //   try {
    //     // Make a request to the backend server to initiate the Facebook OAuth2 flow
    //     const response = await axios.get('/auth/facebook');
    //     window.location.href = response.data.redirectUrl;
    //   } catch (error) {
    //     console.error('Error initiating Facebook login:', error);
    //   }
    // };

    return (
        <>
        <NavBar />
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="username" className="form-control" id="username" name="username" value={formData.username} onChange={handleChange} required />
                </div>
                <br></br>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <br></br>
                <button type="submit" className="btn btn-primary btn-lg">Login</button>
            </form>
            <br></br>
            <div>
            <GoogleLogin onClick= {login} onSuccess={responseMessage} onError={errorMessage} />
            </div>
            {/* <div class="container unauthenticated">
            <button className="btn btn-secondary btn-lg" href="/oauth2/authorization/google">Login with Google</button>
            </div> */}
            <br></br>
            <br></br>
            <Link to="/register" className="btn btn-success btn-lg">Create an Account</Link>
        </>
    );
}

