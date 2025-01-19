import { Link, Outlet } from "react-router";

export function Transactions(){
    return(
        <div>
            <main>
                <h2>Transactions</h2>
                <nav>
                    <Link to='/transactions'>General</Link>
                    <Link to='/transactions/accounts'>Accounts</Link>
                </nav>
                
                <Outlet />
            </main>
        </div>
    )
}