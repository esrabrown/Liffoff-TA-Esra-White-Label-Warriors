import { useNavigate,Link,Outlet } from "react-router-dom"
import React, { useEffect, useState } from 'react'
import Header from "./Header.jsx"

    export default function convertTransactions(props){
        const [rate, setRate] = useState(0);
        const [number, setNumber] = useState(0);
        const [convertTransaction, setConvertTransaction] = useState({
            amount: 0,
            start: "",
            end: "",
        });
        const [amount,setAmount] = useState();

        //React DOM is one render behind and sallow monitors arrays and objects so you have to let it know when to re-render
        //when rate changes meaning its holding the object returned from the api then setNumber & re render with now updated value making the DOM have the current value
        useEffect(()=>{
            setNumber(rate);
        },[rate])

        const convertT = async (e) =>{
            e.preventDefault();
            console.log(convertTransaction);

            //Make correct url to pull from api
            const URL = "https://api.frankfurter.app/latest?amount=" + convertTransaction.amount + "&from=" + convertTransaction.start + "&to=" + convertTransaction.end;
            //pull & convert using api
            const result = await fetch(URL, {
                method: "GET",
                headers:{"Content-Type":"application/json"},
            }).then(res=>res.json()).then((result)=>{setRate(result.rates[convertTransaction.end]);});
        }

        //update convertTransaction object with new updated values that also allow for values on screen to change using value = {convertTransaction.variableName}
        const handleChange = (e)=>{
            const value= e.target.value;
            setConvertTransaction({...convertTransaction,[e.target.name]: value });
            console.log(convertTransaction);
        }

        return(
            <>
                <Link to="/transactions">| Back to Transactions |</Link>
                <Link to="/transactions/chart">| Chart Breakdown |</Link>


                <h2>Convert Currency Here!</h2>

                <form method="POST">

                <label for="amount">Amount</label><br />
                <input type="text" id="amount" name="amount" value = {convertTransaction.amount} onChange = {(e)=>handleChange(e)}/> <br/>

                <label for="start">Starting Currency</label><br />
                <select id="start" name="start" onChange = {(e)=>handleChange(e)}>
                  <option value="">-</option>
                  <option value="USD">US Dollar</option>
                  <option value="MXN">Mexican Peso</option>
                  <option value="CAD">Canadian Dollar</option>
                  <option value="EUR">Euro</option>
                  <option value="GBP">British Pound</option>
                  <option value="JPY">Japanese Yen</option>
                  <option value="RMB">Chinese Yuan</option>
                </select><br />

                <label for="end">Convert To</label><br />
                <select id="end" name="end" onChange = {(e)=>handleChange(e)}>
                  <option value="">-</option>
                  <option value="USD">US Dollar</option>
                  <option value="MXN">Mexican Peso</option>
                  <option value="CAD">Canadian Dollar</option>
                  <option value="EUR">Euro</option>
                  <option value="GBP">British Pound</option>
                  <option value="JPY">Japanese Yen</option>
                  <option value="RMB">Chinese Yuan</option>
                </select><br />

                <br /><input type="submit" value="Convert!" onClick={convertT}/>

                </form>
                <h2> {convertTransaction.amount} {convertTransaction.start} turns into {number} {convertTransaction.end}</h2>
            </>
        )
    }