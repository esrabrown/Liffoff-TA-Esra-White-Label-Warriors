import Header from "./Header.jsx"
import React, { useEffect, useState } from 'react'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import NavBar from "./NavBar.jsx";
import Axios from "axios";
// import {useForm} from 'react-hook-form'

export default function transactionUpdate() {

    const location = useLocation();
    const navigate = useNavigate();
    const data = location.state;
    const { id } = useParams();
    console.log(data);
    const [transaction, setTransaction] = useState({
        id: "",
        name: "",
        description: "",
        amount: 0,
        currency: "",
    });
    const [currency, setCurrency] = useState({});

    useEffect(()=>{

        const fetchTransaction = async ()=>{
            try{
               const response = await fetch("http://localhost:8080/transactions/" + id).then(res=>res.json()).then((result)=>{setTransaction(result);})
            }
            catch(error){
                console.log(error);
            }
        }
            fetchTransaction();
            console.log(transaction);
    }, []);

//FETCH CURRENCIES:
const fetchCurrency = async () => {
    try{
        const response = await fetch("https://api.frankfurter.app/currencies").then(res=>res.json()).then((result)=>{setCurrency(result);})
     }
     catch(error){
         console.log(error);
     }

      };

useEffect(() => {
        fetchCurrency();
}, []);

console.log(Object.keys(currency));
const currencyArr = Object.keys(currency);
// console.log(currency)
// console.log(Object.keys(currency));
// let targetCurrency = [];
// for(let i=0; i<Object.keys(currency).length; i++) {
//     targetCurrency.push(Object.keys(currency)[i])
// }
// console.log(Object.keys(currency))
// for(const [key, value] of Object.entries(currency)) {
//     console.log(`${key}: ${value}`)
// }


      const updateTransaction = (e) => {
        e.preventDefault();
        fetch("http://localhost:8080/transactions/update/" + id, {
            method: "PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(transaction)
        }).then((response)=>{
            navigate('/trips/ID/' + transaction.trip.id);
        }).catch((error)=>{
            console.log(error);
        })
      };

      const handleChange = (e) => {
        const value = e.target.value;
        console.log(value);
        setTransaction({ ...transaction, [e.target.name]: value });
      };
        
   


    return(
        <div>
            <NavBar/>

            {/* <div>{location.state.transactionId} and {location.state.name}</div> */}

            <h2>Update Transaction : {location.state.transactionId}</h2>

            <form method="PUT">

                <label for="name">Transaction Name</label><br />
                <input type="text" name="name" value={transaction.name} id="name" onChange = {(e)=>handleChange(e)}/><br />

                <label for="description">Description</label><br />
                <input type="text" name="description" value={transaction.description} id="description" onChange = {(e)=>handleChange(e)}/><br />

                <label for="amount">Amount</label><br />
                <input type="text" name="amount" value={transaction.amount} id="amount" onChange = {(e)=>handleChange(e)}/><br />

                <label for="currency">Currency</label><br />
                <select id="currency" name="currency" value={transaction.currency} onChange = {(e)=>handleChange(e)}>
                  {currencyArr.map((ans) => {
                    return (
                    <option value={ans}>{ans}</option>
                    )
                    })}
                  {/* <option value="">-</option>
                  <option value="USD">US Dollar</option>
                  <option value="MXN">Mexican Peso</option>
                  <option value="CAD">Canadian Dollar</option>
                  <option value="EUR">Euro</option>
                  <option value="GBP">British Pound</option>
                  <option value="JPY">Japanese Yen</option>
                  <option value="RMB">Chinese Yuan</option> */}
                </select><br />

                <br /><input type="submit" value="Update Transaction!" onClick={updateTransaction}/>

            </form>
        </div>
    )
}