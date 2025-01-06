import { IInstitutionRepository } from "../repositories/intitutions";

export class UpdateInstitution{
    constructor(private readonly repository: IInstitutionRepository){}

    async execute(id: string, name?: string, code?: number, icon?: string){
        if(!id){
            return new Error('Missing mandatory param')
        }

        const institution = await this.repository.findById(id)

        if(!institution){
            return new Error('Institution not found')
        }

        institution.code = code || institution.code
        institution.name = name || institution.name
        institution.icon = icon || institution.icon

        const response = await this.repository.save(institution)
        if(response){
            return institution
        } else {
            return new Error('Fail to update institution')
        }

    }
}