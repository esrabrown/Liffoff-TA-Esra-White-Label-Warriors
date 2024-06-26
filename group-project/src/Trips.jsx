import { useNavigate, Link, Outlet } from "react-router-dom"
import React, { useEffect, useState } from 'react'
import Header from "./components/Header.jsx"
import NavBar from "./components/NavBar.jsx"

export default function Trips() {
    const [trips, setTrips] = useState([])
    const navigate = useNavigate();

    useEffect(()=>{
        fetch("http://localhost:8080/trips/getAll").then(res=>res.json()).then((result)=>{setTrips(result);})
    },[trips])

    const handleUpdate = (e,id)=>{
        e.preventDefault();
        navigate('/trips/update/' + id);
    }

    const handleDelete = (e,id)=>{
        e.preventDefault();
        navigate("/trips/delete/" + id);
    }

    return (
    <div>
        <NavBar/>
        <button><Link to="/trips/add">Add Trip</Link></button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button><Link to="/trips/search">Search Trips</Link></button>
        <br/>
        <hr/>
        <h1>Trips</h1>
        <table>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Destination</th>
                <th>Budget</th>
            </tr>

            {trips.map(ans=>(
            <tr>
                <td><Link to={`/trips/ID/${ans.id}`}>{ans.id}</Link></td>
                <td>{ans.name}</td>
                <td>{ans.destination}</td>
                <td>{ans.budget}</td>
                <td><Link to={`/trips/ID/${ans.id}`}>See Trip Transactions</Link></td>
                <button onClick={(e)=>handleUpdate(e,ans.id)}>Update</button>
                <button onClick={(e)=>handleDelete(e,ans.id)}>Delete</button>
            </tr>
            ))}

        </table>
    </div>
)}