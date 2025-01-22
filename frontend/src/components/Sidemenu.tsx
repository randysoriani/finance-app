import { GrTransaction } from "react-icons/gr";
import { SlGraph } from "react-icons/sl";
import { TbLayoutDashboard } from "react-icons/tb";
import { NavLink } from "react-router";

export function Sidemenu(){
    return(
        <aside className='bg-white flex gap-1 flex-col min-w-52'>
            <div className='mb-24' />

            <NavLink className={({isActive}) => `text-gray-500 w-full py-1 px-4 hover:text-gray-800 flex gap-2 items-center
                            ${isActive && 'text-white bg-sky-600 hover:text-white' }`}  
                      to="/dashboard">
                <TbLayoutDashboard />
                <span>Dashboard</span>
            </NavLink>

            <NavLink className={({isActive}) => `text-gray-500 w-full py-1 px-4 hover:text-gray-800 flex gap-2 items-center
                            ${isActive && 'text-white bg-sky-600 hover:text-white' }`} 
                      to="/transactions">
                <GrTransaction />
                <span>Transactions</span>
            </NavLink>

            <NavLink className={({isActive}) => `text-gray-500 w-full py-1 px-4 hover:text-gray-800 flex gap-2 items-center
                            ${isActive && 'text-white bg-sky-600 hover:text-white' }`}
                      to="/investments">
                <SlGraph />
                <span>Investments</span>
            </NavLink>
        </aside>
    )
}