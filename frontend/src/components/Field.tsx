interface IProps{
    children: React.ReactNode
}

export function Field({children}: IProps){
    return(
        <fieldset>
            {children}
        </fieldset>
    )
}