import Header from "./Header.jsx"
import React, { useState } from 'react'


export default function TransactionSearch(){

    const [sel, setSel] = useState("name")
    const [q, setQ] = useState("")
    const [ans, setAns] = useState([])

    function searchTransaction() {
        if (sel=="name") {
            fetch(`http://localhost:8080/transactions/searchByName?name=${q}`).then(res=>res.json()).then((result)=>{setAns(result);})
        } else if (sel == "amount") {
            if (isNaN(q)) {
                console.log('error')
            } else {
                fetch(`http://localhost:8080/transactions/searchByAmount?amount=${q}`).then(res=>res.json()).then((result)=>{setAns(result);})
            }
        }
    }

    return (
    <div>
        <Header/>

        <input type="text" name = {q} onChange = {(e)=>setQ(e.target.value)} />
        <select name = {sel} value={sel} onChange = {(e)=>setSel(e.target.value)}>
            <option value="name">Name of Transaction</option>
            <option value="amount">Amount of Transaction</option>
        </select>

        <br />
        <button onClick = {searchTransaction}>Search</button>
        <br />
        <br />

        <hr />
        <table>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Note</th>
                <th>Amount</th>
                <th>Currency</th>
            </tr>

            {ans.map(a=>(
            <tr>
                <td>{a.id}</td>
                <td>{a.name}</td>
                <td>{a.description}</td>
                <td>{a.amount}</td>
                <td>{a.currency}</td>
            </tr>
            ))}
        </table>
    </div>
    );
}