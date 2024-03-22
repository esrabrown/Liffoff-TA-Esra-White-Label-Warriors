import { Link } from "react-router-dom";

export default function Header() {return (
    <>
        <nav>
            <Link to="/">| Home |</Link>
            <Link to="/test">| Test |</Link>
            <Link to="/transactions">| Transactions |</Link>
        </nav>
        <br />
        <br />
    </>
);}