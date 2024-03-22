import {  Link, Outlet } from "react-router-dom"
import React, { useEffect, useState } from 'react'
import Header from "./components/Header.jsx"
import NavBar from "./components/NavBar.jsx";

export default function Transactions() {

    const[transactions, setTransactions] = useState([])
    const[isLoading, setIsLoading] = useState(false)

    useEffect(()=>{
        setIsLoading(true)
        fetch("http://localhost:8080/transactions/getAll").then(res=>res.json()).then((result)=>{setTransactions(result);})
        setIsLoading(false)
    },[])

    if (isLoading) {
        return (<div>Fetching transactions from database</div>);
    }

    return(
        <>
            <NavBar />
            <Header />

            <br/>
            <Link to="/transactions/add">Add New Transaction</Link>
            <br/>
            <Link to="/transactions/search">Search Transactions</Link>
            <br/>
            <h1>All Transactions</h1>

            <table>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Note</th>
                    <th>Amount</th>
                    <th>Currency</th>
                </tr>

                {transactions.map(ans=>(
                <tr>
                    <td>{ans.id}</td>
                    <td>{ans.name}</td>
                    <td>{ans.description}</td>
                    <td>{ans.amount}</td>
                    <td>{ans.currency}</td>
                </tr>
                ))}
            </table>

            <Outlet />
        </>
);}