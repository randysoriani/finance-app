import { Link } from "react-router";

export function Dashboard(){
    return(
        <div>
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/transactions">Transactions</Link>
            </aside>
            <main>
                <h2>Dashboard</h2>
            </main>
        </div>
    )
}