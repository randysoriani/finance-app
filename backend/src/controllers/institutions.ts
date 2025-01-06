import { Repository } from "typeorm"
import { InstitutionRepositoryInMemory } from "../repositories/inmemory/institutions"
import { InstitutionsRepositoryORM } from "../repositories/typeorm/institutions"
import { CreateInstitution } from "../usecases/createinstitution"
import { DeleteInstitution } from "../usecases/deleteinstitution"
import { UpdateInstitution } from "../usecases/updateinstitution"

export class InstitutionController{
    static async create(req: any, res: any){
        const { name, code, icon } = req.body

        if(!name || !code){
            return res.status(400).json({status: 'error', message: 'Bad requisition'})
        }

        const repository = new InstitutionsRepositoryORM()
        const service = new CreateInstitution(repository)

        const response = await service.execute(name, code, icon)
        if(response instanceof Error){
            return res.status(500).json({status: 'error', message: 'Unable to create institution'})
        } else {
            return res.status(201).json({
                status: 'ok', 
                message:'Institution created', 
                payload: { 
                    id: response.id
                }
            })
        }
    }

    static async delete(req: any, res: any){
        const { id } = req.params
        if(!id){
            return res.status(400).json({status: 'error', message: 'Bad requisition'})
        }

        const repository = new InstitutionsRepositoryORM()
        const service = new DeleteInstitution(repository)
        const response = await service.execute(id)

        if(response instanceof Error){
            return res.status(500).json({status: 'error', message: 'Unable to delete institution'})
        } else {
            return res.status(200).json({status: 'ok', message: 'Institution deleted'})
        }

    }

    static async update(req: any, res: any){
        const { id } = req.params
        const { name, code, icon } = req.body

        const repository = new InstitutionsRepositoryORM()
        const service = new UpdateInstitution(repository)
        const response = await service.execute(id, name, code, icon)

        if(response instanceof Error){
            return res.status(500).json({status: 'error', message: 'Unable to update institution'})
        } else {
            return res.status(200).json({status: 'ok', message: 'Institution updated', response})
        }
    }
}