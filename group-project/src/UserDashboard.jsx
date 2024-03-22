import Header from "./components/Header.jsx"
import LiveExchangeRates from "./components/LiveExchangeRates.jsx";
import NavBar from "./components/NavBar.jsx";

export default function UserDashboard(props) {return (
    <>
        <NavBar/>
        <LiveExchangeRates/>

        <form method = "POST">
            <input type = "text" name = "test1"/>
            <input type = "submit" />
        </form>
    </>
);}