import { Link, Outlet } from "react-router-dom"
import Header from "./components/Header.jsx"
import NavBar from "./components/NavBar.jsx";
export default function Transactions() {return(
    <>
        <NavBar />
        <Header />

        <br/>
        <Link to="/transactions/add">Add New Transaction</Link>
        <br/>
        <h1>All Transactions</h1>

{/*         {transactions.map(ans=>( */}
{/*             <h3> */}
{/*                 ID: {ans.ID} <br/> */}
{/*                 Name: {ans.name} <br/> */}
{/*                 Note: {ans.description} <br/> */}
{/*                 Amount: {ans.amount} <br/> */}
{/*                 Currency: {ans.currency} <br/> */}
{/*             </h3> */}
{/*         ))} */}

        <Outlet />
    </>
);}