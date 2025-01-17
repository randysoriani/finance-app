import { ReactNode } from "react"

interface ILabelProps {
    forField: string
    children: ReactNode
}

export function Label({forField, children}: ILabelProps){
    return(
        <label htmlFor={forField} className='block text-sm font-medium text-gray-700 dark:text-gray-300'>{children}</label>
    )
}