import { useNavigate,Link,Outlet } from "react-router-dom"
import React, { useEffect, useState } from 'react'
import Header from "./components/Header.jsx"
import NavBar from "./components/NavBar.jsx"
import FormControlLabel from "@mui/material/FormControlLabel";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Checkbox from "@mui/material/Checkbox";
import checked from "@mui/material/Checkbox";
import { set } from "date-fns/fp/set";



export default function Transactions(props) {




    const[transactions, setTransactions] = useState([])
    const[transaction, setTransaction] = useState({})
    const[isLoading, setIsLoading] = useState(false)
    const[toDelete, setToDelete] = useState({})
    // const[favorite, setFavorite] = useState(false);
    const[isChecked, setIsChecked] = useState({});
    const[checkedState, setCheckedState] = useState([]);

    const navigate = useNavigate();

    useEffect(()=>{
            setIsLoading(true)
//            fetch("http://localhost:8080/transactions/getAll").then(res=>res.json()).then((result)=>{setTransactions(result);})
            console.log("first useeffect");
            console.log(localStorage.getItem('token'));
            fetch("http://localhost:8080/transactions/getAll", {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then(res=>res.json()).then((result)=>{setTransactions(result);})



            setIsLoading(false)


    },[transactions])

    if (isLoading) {
        return (<div>Fetching transactions from database</div>);
    }


// console.log(transactions)

    useEffect(()=>{
        console.log("second useeffect")
        const newArr = []
        for(let i=0; i<transactions.length; i++) {
            // console.log(transactions[i]["favorite"])
            newArr.push(transactions[i]["favorite"] === false ? false : true)
        // console.log(newArr);
        }
        setCheckedState(newArr);
        // console.log(checkedState)
    }, [transactions])

    console.log(checkedState)

    const handleDelete = async (e,id, tripId) =>{
        e.preventDefault();
        console.log(id);
         const deleteTransaction = async (id)=>{
            await fetch("http://localhost:8080/transactions/" + id,{
                method:"DELETE",
                headers:{"Content-Type":"application/json",
                Authorization: 'Bearer ' + localStorage.getItem('token')}
            }).then(()=>console.log("transaction deleted"))}
            deleteTransaction(id);
    }

    const handleUpdate = (e,id,name,description,amount,currency) =>{
        e.preventDefault();
    //route dom useNavigate with state variable to be used with useLocation in other page
        navigate('/transactions/update/' + id, {state:{transactionId:id,name:name,description:description,amount:amount,currency:currency}})
    }
    //buttons used to find by id through @queryParam & to pass data to update page

    //Handle Click for Favorite Buttons
const handleFavorite = async (e,id,position) => {
    await fetch("http://localhost:8080/transactions/favorite/" + id, {
        method: "PUT",
        headers:{"Content-Type":"application/json",
                Authorization: 'Bearer ' + localStorage.getItem('token')},
        body:JSON.stringify(transaction)
    }).then((response)=>{
    //     navigate('/transactions', {state:{transactionId:id,favorite:favorite}});
    }).catch((error)=>{
        console.log(error);
    })

    fetch("http://localhost:8080/transactions/getAll", {
                                                             headers:{"Content-Type":"application/json",
                                                                     Authorization: 'Bearer ' + localStorage.getItem('token')},
                                                             }).then(res=>res.json()).then((result)=>{setTransactions(result);})

    // setIsChecked(checked[id]= !isChecked);
//     const updatedCheckedState = checkedState.map((item, index) =>
//     index === position ? !item : item
// );
//     setCheckedState(updatedCheckedState);
    // console.log(updatedCheckedState)
    // setCheckedState(checkedState);
    const arr = []
    for(let i=0; i<transactions.length; i++) {
        // console.log(transactions[i]["favorite"])
        arr.push(transactions[i]["favorite"] === false ? false : true)
    console.log(arr);
    }
    setCheckedState(arr);
    console.log(checkedState)
    
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
                    <th>Trip</th>
                    <th></th>
                    <th></th>
                    <th>Favorite</th>
                </tr>
                {console.log(transactions)}
                {transactions.map((ans, index)=>(
                <tr>
                    <td>{ans.id}</td>
                    <td>{ans.name}</td>
                    <td>{ans.description}</td>
                    <td>{ans.amount}</td>
                    <td>{ans.currency}</td>
                    <td>{ans.tripId}</td>
                    <td><button onClick={(e)=>handleUpdate(e,ans.id,ans.name,ans.description,ans.amount,ans.currency)}>Update</button></td>
                    <td><button onClick={(e)=>handleDelete(e,ans.id,ans.tripId)}>Delete</button></td>
                    <td>
                    <FormControlLabel
                            control = {
                                <Checkbox value={checked[ans.id]}
                                    icon = {<FavoriteBorderIcon />}
                                    checkedIcon = {<FavoriteIcon />}
                                    // checked = {ans.favorite === false ? false : true}
                                    checked = {ans.favorite}
                                    onClick = {(e)=>handleFavorite(e, ans.id, ans.favorite, index)}
                                    // onValueChange={(newValue) => { setChecked({...checked, [ans.id]: newValue}) }}

                        />
                              }
                        />
                    </td>
                </tr>
                ))}
            </table>

            <Outlet />
        </>
);}