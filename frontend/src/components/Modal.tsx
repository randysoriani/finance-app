import { useRef, useEffect } from "react"

export interface IProps{
    title?: string
    showHeader?: boolean
    open: boolean
    onClose(): void
    children: React.ReactNode
}

export function Modal({title, showHeader = false, onClose, open, children}: IProps){
    const ref = useRef<HTMLDivElement>(null)

    useEffect(()=> {
        ref.current?.focus()
    }, [open])
    
    return(
        <>
            { open &&
                <div ref={ref}
                    tabIndex={-1}
                    className='z-20 bg-black/50 absolute top-0 bottom-0 right-0 left-0 flex items-center justify-center'
                    onClick={(event)=>{
                            event.preventDefault()
                            if (event.target === event.currentTarget) {
                                onClose()}
                            }
                    }
                    onKeyDown={(event) => {
                        if (event.key === 'Escape'){
                            onClose()
                        }
                    }} >

                    <div className='bg-gray-100 rounded'>
                        {showHeader && <header className='flex p-4 gap-4 justify-between w-full items-center'>
                            <h2 className='font-semibold text-xl uppercase text-gray-700'>{title}</h2>
                            <button onClick={onClose}>close</button>
                        </header>}
                        { children }
                    </div>
                    
                </div>
            }
        </>
    )
}