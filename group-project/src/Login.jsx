import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './components/NavBar';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'

export default function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [user,setUser] = useState({});

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/login', formData);
            localStorage.setItem("token", response.data['token']);
            console.log(localStorage.getItem('token'));
        } catch (error) {
            console.error('Login failed:', error);
        }
    };
// added
//     const handleGoogleLogin = async () => {
//       try {
//         // Make a request to the backend server to initiate the Google OAuth2 flow
//         const response = await axios.get('/auth/google');
//         window.location.href = response.data.redirectUrl;
//       } catch (error) {
//         console.error('Error initiating Google login:', error);
//       }
//     };
// // added
//     const handleFacebookLogin = async () => {
//       try {
//         // Make a request to the backend server to initiate the Facebook OAuth2 flow
//         const response = await axios.get('/auth/facebook');
//         window.location.href = response.data.redirectUrl;
//       } catch (error) {
//         console.error('Error initiating Facebook login:', error);
//       }
//     };
//for some reason adding this into the login button makes the authentication not work? onClick={()=>{navigate("/")}}
    let handleCallbackResponse = (response) => {
        console.log(response.credential)
        let userObj = jwtDecode(response.credential)
        setUser(userObj)
    }
    useEffect(() => {
        google.accounts.id.initialize({
            client_id:"172648903163-21rk129pjh909hkt8irlp5d0cadvo5ml.apps.googleusercontent.com",
            callback:handleCallbackResponse
        })

        google.accounts.id.renderButton(document.getElementById('signInDiv'), {
            theme:'outline',
            size:'large'

        })
    }, [])

    const googleLogin =  useGoogleLogin({

        onSuccess: (codeResponse) => {
          fetch('/api/auth/google', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: codeResponse.code }),
          }).then(response => response.json()).then(result => {
            localStorage.setItem("token", result['token']);
            console.log(localStorage.getItem('token'));
            console.log(result['token']);
          })
          .catch(error => {
            console.error('Error:', error);
          });
        },
        onError: () => {
          console.error('Google login failed');
        },
        flow: 'auth-code',
      });

    

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
                <div id="signInDiv">
                    <GoogleLogin onClick={() => googleLogin()}/>
                </div>
            <br></br>
            <br></br>
            <Link to="/register" className="btn btn-success btn-lg">Create an Account</Link>
        </>
    );
}
