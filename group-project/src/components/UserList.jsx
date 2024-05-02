import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";

export default function UserList() {
    const [users, setUsers] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch("http://localhost:8080/users", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const formData = await response.json();
                setUsers(formData);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
        }, []);

    // const cors = require('cors');
    // app.use(cors());
    // app.get('/cors', (req, res) => {
    //     res.set('Access-Control-Allow-Origin', '*');
    // });

    // app.get('/cors', (req, res) => {
    //     res.set('Access-Control-Allow-Origin', '*');
    //     res.send({ "msg": "This has CORS enabled 🎈" })
    //     })

//     const cors = require('cors');
// const express = require('express');
// let app = express();
// app.use(cors());
// app.options('*', cors());

            // try {
            //     fetch("http://localhost:8080/register", {
    
            //             method:"POST",
            //             headers:{
            //                 "Content-Type":"application/json",
            //             },
            //             body:JSON.stringify(formData)
    
            //     }).then(res=>res.json()).then((result)=>{
    
            //         localStorage.setItem("token", result['token']);
            //         console.log(localStorage.getItem('token'));
            //         console.log(result['token']);
            //         navigate("/")
            //     })
            // } catch (error) {
            //     console.error('Registration failed:', error);
            // }
    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Username</th>
                    <th scope="col">Name</th>
                    <th scope="col">Most Recent Trip</th>
                </tr>
            </thead>
        <tbody>
            {users.map((user) => (
                <tr key={user.id}>
                    <td>
                    {/* <a href = > */}
                        {user.username}
                    {/* </a> */}
                    </td>
                </tr>
            ))}
            <tr>
                <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
            </tr>
            <tr>
                <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
            </tr>
            <tr>
                <th scope="row">3</th>
                    <td colSpan="2">Larry the Bird</td>
                    <td>@twitter</td>
            </tr>
        </tbody>
        </table>
    )
}