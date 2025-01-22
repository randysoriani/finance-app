import { useEffect, useState } from "react"
import { axiosClient } from "../../helper/axios"
import { NewAccountForm } from "../../components/NewAccountForm"
import { Modal } from "../../components/Modal"
import { Button } from "../../components/Button"

interface IAccount{
    id: string
    name: string
    description: string
    agency: number
    account: number
}

export function Accounts(){
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [accounts, setAccounts] = useState<IAccount[]>([])
    const [isNewAccountFormVisible, setIsNewAccountFormVisible] = useState<boolean>(false)

    function getAccountList(){
        axiosClient.get('accounts')
            .then(response => {
                setAccounts(response.data.accounts)
                setIsLoading(false)
            })
    }
    
    useEffect( ()=>{
        getAccountList()
    }, [])

    function closeModalForm(){
        setIsNewAccountFormVisible(false)
    }
 
    return(
        <>
            <Modal title='New account form' open={isNewAccountFormVisible} onClose={closeModalForm} >
                <NewAccountForm />
            </Modal>
            <div>
                <div className='flex gap-4 overflow-auto'>
                    <Button onClick={() => setIsNewAccountFormVisible(true)}
                            kind="Ghost">
                        <span className='text-gray-600'>New account</span>
                    </Button>
                
                    {!isLoading && accounts.length > 0 && 
                        accounts.map(acc => 
                            <div className='bg-white shadow-sm rounded p-4' key={acc.id}>{acc.name}</div>
                            )
                        }
                </div>

                    
            </div>
        </>
    )
}