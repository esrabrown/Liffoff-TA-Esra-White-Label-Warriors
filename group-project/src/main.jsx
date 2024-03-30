import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import UserDashboard from "./UserDashboard.jsx"
import Test from "./components/Test.jsx"
import Error404 from "./components/Error404.jsx"
import Transactions from "./Transactions.jsx"
import TransactionDisplayByID from "./components/TransactionDisplayByID.jsx"
import TransactionAdd from "./components/TransactionAdd.jsx"
import TransactionSearch from "./components/TransactionSearch.jsx"
import Trips from "./Trips.jsx"
import TripAdd from "./components/TripAdd.jsx"
import TripSearch from "./components/TripSearch.jsx"
import TripByID from "./components/TripByID.jsx"

const router = createBrowserRouter([
    {
        path: "/",
        element: <UserDashboard />,
        errorElement: <Error404 />
    },
    {
        path: "/test",
        element: <Test />,
    },
    {
        path: "/transactions",
        element: <Transactions />,
//         children: [
//             {
//                 path: "/transactions/:transactionID",
//                 element: <TransactionDisplayByID />,
//             },
//         ]
    },
    {
        path: "/transactions/add",
        element: <TransactionAdd />,
    },
    {
        path: "/transactions/search",
        element: <TransactionSearch />,
    },
    {
        path: "/trips",
        element: <Trips />,
    },
    {
        path: "/trips/add",
        element: <TripAdd />,
    },
    {
         path: "/trips/search",
         element: <TripSearch />,
     },
     {
         path: "/trips/ID/:ID",
         element: <TripByID />,
     },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
