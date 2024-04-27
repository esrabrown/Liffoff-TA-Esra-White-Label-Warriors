import { useNavigate, Link, Outlet } from "react-router-dom"
import React, { useEffect, useState } from 'react'
import Header from "./components/Header.jsx"

export default function Trips() {
    const [trips, setTrips] = useState([])
    const navigate = useNavigate();

    useEffect(()=>{
        fetch("http://localhost:8080/trips/getAll", {
            headers: {Authorization: 'Bearer ' + localStorage.getItem('token')
                                                         	}}).then(res=>res.json()).then((result)=>{setTrips(result);})
    },[trips])

    const handleUpdate = (e,id)=>{
        e.preventDefault();
        navigate('/trips/update/' + id);
    }

    const deleteTripTransactions = async (response)=>{
        await response.map((data)=>{

          fetch("http://localhost:8080/transactions/" + data.id,{
                        method:"DELETE",
                        headers:{"Content-Type":"application/json",
                        Authorization: 'Bearer ' + localStorage.getItem('token')}
                    }).then(()=>console.log("transactions deleted"))

                    })
      }

       const deleteTrip = async (id)=>{
          await fetch("http://localhost:8080/trips/" + id,{
              method:"DELETE",
              headers:{"Content-Type":"application/json",
              Authorization: 'Bearer ' + localStorage.getItem('token')}
          }).then(()=>console.log("trip deleted"))
          }

    const handleDelete = (e,id)=>{
        e.preventDefault();

        const fetchTripTransactions = async (id)=>{
           const response = await fetch("http://localhost:8080/transactions/searchByTripID?ID=" + id,{
                headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}).then((res)=>res.json())
            console.log(response);
            deleteTripTransactions(response);
            }

        fetchTripTransactions(id);
        //deleteTripTransactions(response);
        deleteTrip(id);
        deleteTrip(id);

        //navigate("/trips/delete/" + id);
    }

    return (
    <div>
        <Header/>
        <Link to="/trips/add">Add a Trip</Link>
        <br/>
        <Link to="/trips/search">Search a Trip</Link>
        <br/>
        <hr/>
        <h1>All Trips</h1>
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