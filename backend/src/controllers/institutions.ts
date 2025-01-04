import { InstitutionRepositoryInMemory } from "../repositories/inmemory/institutions"
import { InstitutionsRepositoryORM } from "../repositories/typeorm/institutions"
import { CreateInstitution } from "../usecases/createinstitution"

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
}