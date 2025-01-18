interface IProps{
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