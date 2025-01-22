export interface ISectionHeaderProps{
    icon: React.ReactNode
    title: string
    subtitle: string
}

export function SectionHeader({icon, title, subtitle}: ISectionHeaderProps){
    return(
        <div className='flex gap-4 items-center text-gray-600'>
            {icon}
            <div>
                <h2 className='text-2xl font-semibold'>{title}</h2>
                <p className='text-pretty'>{subtitle}</p>
            </div>
        </div>
    )
}