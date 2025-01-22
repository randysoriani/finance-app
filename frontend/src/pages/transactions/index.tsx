import { NavLink, Outlet } from "react-router";
import { SectionHeader } from "../../components/SectionHeader";
import { GrTransaction } from "react-icons/gr";

export function Transactions(){
    return(
        <div>
            <SectionHeader title="Transactions" subtitle="Keep track of incomes and outcomes" icon={<GrTransaction size={38} />} />
            <nav className='mb-8 mt-4 flex gap-4'>
                <NavLink end={true} className={({isActive}) => `
                            pb-2
                            ${isActive 
                                ? 'font-semibold border-b-2 border-gray-800' : 'font-normal border-none' }`} 
                            to='/transactions'>General</NavLink>
                <NavLink className={({isActive}) => `
                            pb-2
                            ${isActive 
                                ? 'font-semibold border-b-2 border-gray-800' : 'font-normal border-none'}`} 
                            to='/transactions/accounts'>Accounts</NavLink>
            </nav>
            
            <Outlet />
        </div>
    )
}