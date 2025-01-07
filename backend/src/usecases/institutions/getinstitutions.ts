import { IInstitutionRepository } from "../../repositories/intitutions";

export class GetInstitutions{
    constructor(private readonly repository: IInstitutionRepository){}

    async execute(id?: string){
        if(id){
            const institution = await this.repository.findById(id)
            return {institution}
        } else {
            const institutions = await this.repository.findAll()
            return {institutions}
        }
    }
}