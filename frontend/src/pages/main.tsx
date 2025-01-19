import { Outlet } from "react-router";
import { Sidemenu } from "../components/Sidemenu";

export function Main(){
    return(
        <main className='h-screen bg-gray-200'>
            <Sidemenu />
            <Outlet />
        </main>
    )
}