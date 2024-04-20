import Header from "./Header.jsx"
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'

export default function TripByID(props) {

    const ID = useParams().ID
    const [trip, setTrip] = useState([])
    const [transactions, setTransactions] = useState([])
    const navigate = useNavigate();

    useEffect(()=>{
        console.log(typeof ID)
        fetch("http://localhost:8080/trips/ID/" + ID).then(res=>res.json()).then((result)=>{setTrip(result);})
        fetch("http://localhost:8080/transactions/searchByTripID?ID=" + ID).then(res=>res.json()).then(result=>{setTransactions(result);})
    },[])

    const handleDelete = async (e,id,tripId) =>{
        e.preventDefault();
        console.log(id);
        navigate('/transactions/delete/' + id, {state:{tripId:tripId}});
    }

    const handleUpdate = (e,id,name,description,amount,currency) =>{
        e.preventDefault();
    //route dom useNavigate with state variable to be used with useLocation in other page
        navigate('/transactions/update/' + id, {state:{transactionId:id,name:name,description:description,amount:amount,currency:currency}})
    }

    return (
    <div>

        <Header/>

        <h1>{trip.name}</h1>
        <h2>To {trip.destination}</h2>

        <br/>

        <button><Link to="/transactions/add">Add Transaction</Link></button>

        <table>
            <tr>
                <th>Transactions</th>
                <th>Amount</th>
                <th>Currency</th>
            </tr>

            {transactions.map(ans=>(
            <tr>
                <td>{ans.name}</td>
                <td>{ans.description}</td>
                <td>{ans.amount}</td>
                <td>{ans.currency}</td>
                <td><button onClick={(e)=>handleUpdate(e,ans.id,ans.name,ans.description,ans.amount,ans.currency)}>Update</button></td>
                <td><button onClick={(e)=>handleDelete(e,ans.id,ans.trip.id)}>Delete</button></td>
            </tr>
            ))}
        </table>

        <Link to="/trips">Back to all trips</Link>

    </div>
    );
}