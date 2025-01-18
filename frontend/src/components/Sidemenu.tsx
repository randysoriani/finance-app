import { Link } from "react-router";

export function Sidemenu(){
    return(
        <aside>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/transactions">Transactions</Link>
        </aside>
    )
}