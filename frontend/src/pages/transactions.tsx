import { Link } from "react-router";

export function Transactions(){
    return(
        <div>
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/transactions">Transactions</Link>
            </aside>
            <main>
                <h2>Transactions</h2>
            </main>
        </div>
    )
}