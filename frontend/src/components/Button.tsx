import { ButtonHTMLAttributes } from "react"

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    onClick?: () => {}
    children: React.ReactNode
}

export function Button({onClick, children}: IProps){
    return(
        <button onClick={onClick}>
            {children}
        </button>
    )
}