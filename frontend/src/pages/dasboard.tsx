import { TbLayoutDashboard } from "react-icons/tb";
import { SectionHeader } from "../components/SectionHeader";

export function Dashboard(){
    return(
        <div>
            <SectionHeader title="Dashboard" subtitle="Show all your finances in just one place" icon={<TbLayoutDashboard size={38} />} />
        </div>
    )
}