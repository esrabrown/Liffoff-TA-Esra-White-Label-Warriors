import { Link } from "react-router-dom";

export default function Header() {return (
    <div>
        <nav>
            <Link to="/">| Home |</Link>
            <Link to="/test">| Test |</Link>
            <Link to="/trips">| Trips |</Link>
            <Link to="/transactions">| Transactions |</Link>
            <Link to="/transactions/convert">| Convert! |</Link>
            <Link to="/transactions/chart">| Chart Breakdown |</Link>
        </nav>
        <br />
        <br />
    </div>
);}