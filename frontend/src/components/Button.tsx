import { ButtonHTMLAttributes } from "react"

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    onClick?: () => void
    kind?: 'Primary' | 'Secondary' | 'Ghost' | 'Link' | 'Icon'
    children: React.ReactNode
}

export function Button({onClick, children, kind = 'Secondary'}: IProps){
    return(
        <button onClick={onClick}
                className={
                    `   rounded px-4 py-2 flex items-center justify-center
                        ${kind === 'Primary' && 'bg-indigo-500'}
                        ${kind === 'Secondary' && 'bg-gray-300'}
                        ${kind === 'Ghost' && 'bg-transparent border-gray-500 border-[1px]'}
                        ${kind === 'Link' && 'bg-transparent'}
                        ${kind === 'Icon' && 'bg-transparent p-0'}
                    `
                }>
            {children}
        </button>
    )
}