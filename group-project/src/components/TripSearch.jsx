import Header from "./Header.jsx"
import React, { useState } from 'react'
import NavBar from "./NavBar.jsx"


export default function TripSearch(){

    const [sel, setSel] = useState("name")
    const [q, setQ] = useState("")
    const [ans, setAns] = useState([])

    function searchTrip() {
        if (sel=="name") {
            fetch(`http://localhost:8080/trips/searchByName?name=${q}`).then(res=>res.json()).then((result)=>{setAns(result);})
        } else if (sel == "budget") {
            if (isNaN(q)) {
                console.log('error')
            } else {
                fetch(`http://localhost:8080/trips/searchByBudget?budget=${q}`).then(res=>res.json()).then((result)=>{setAns(result);})
            }
        } else if (sel == "destination") {
            fetch(`http://localhost:8080/trips/searchByDestination?destination=${q}`).then(res=>res.json()).then((result)=>{setAns(result);})
        }
    }

    return (
    <div>
        <NavBar/>

        <input type="text" name = {q} onChange = {(e)=>setQ(e.target.value)} />
        <select name = {sel} value={sel} onChange = {(e)=>setSel(e.target.value)}>
            <option value="name">Name of Trip</option>
            <option value="destination">Destination of Trip</option>
            <option value="budget">Trip Budget</option>
        </select>

        <br />
        <button onClick = {searchTrip}>Search</button>
        <br />
        <br />

        <hr />
        <table>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Destination</th>
                <th>Budget</th>
            </tr>

            {ans.map(ans1=>(
            <tr>
                <td>{ans1.id}</td>
                <td>{ans1.name}</td>
                <td>{ans1.destination}</td>
                <td>{ans1.budget}</td>
            </tr>
            ))}
        </table>
    </div>
    );
}