import { IInstitutionRepository } from "../../repositories/intitutions";

export class DeleteInstitution{
    constructor(private readonly repository: IInstitutionRepository){}

    async execute(id: string){
        if(!id){
            return new Error('Missing mandatory param')
        }

        const response = await this.repository.delete(id)
        if(!response){
            return new Error('Institution not found')
        } else {
            return true
        }
    }
}