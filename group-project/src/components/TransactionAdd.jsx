import Header from "./Header.jsx"
import React, { useEffect, useState } from 'react'
import NavBar from "./NavBar.jsx"

export default function TransactionAdd() {

    const[name,setName]=useState('')
    const[description,setDescription]=useState('')
    const[amount,setAmount]=useState('')
    const[currency,setCurrency]=useState('')
    const[transactions, setTransactions]=useState([])

    const submitTransaction=(e)=>{
        e.preventDefault()
        const transaction = {name, description, amount, currency}
        console.log(JSON.stringify(transaction))

        fetch("http://localhost:8080/transactions/add", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(transaction)
                }
        ).then(
            ()=>{console.log("New record sent")}
        )
    }

    useEffect(()=>{
        fetch("http://localhost:8080/transactions").then(res=>res.json()).then((result)=>{setTransactions(result);})
    },[])

    return(
    <>
        <NavBar />

        <form method="POST">
            <label for="name">Transaction Name</label><br />
            <input type = "text" name = "name" id="name" onChange = {(e)=>setName(e.target.value)} /><br />

            <label for="description">Description</label><br />
            <input type = "text" name = "description" id="description" onChange = {(e)=>setDescription(e.target.value)} /><br />

            <label for="amount">Transaction Amount</label><br />
            <input type = "text" name = "amount" id="amount" onChange = {(e)=>setAmount(e.target.value)} /><br />

            <label for="currency">Currency</label><br />
            <select id="currency" name="currency" onChange = {(e)=>setCurrency(e.target.value)}>
              <option value="">-</option>
              <option value="USD">US Dollar</option>
              <option value="MXN">Mexican Peso</option>
              <option value="CAD">Canadian Dollar</option>
              <option value="EUR">Euro</option>
              <option value="GBP">British Pound</option>
              <option value="JPY">Japanese Yen</option>
              <option value="RMB">Chinese Yuan</option>
            </select><br />

            <br /><input type = "submit" onClick={submitTransaction}/>
        </form>
    </>
);}