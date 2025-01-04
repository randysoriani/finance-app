import { nanoid } from "nanoid";
import { IInstitutionRepository } from "../repositories/intitutions";

export class CreateInstitution{
    constructor (private readonly repository: IInstitutionRepository){}
  
    async execute(name: string, code: number, icon: string = ''){
        if(!name || !code){
            return new Error('Missing mandatory params')
        }
        
        const exists = await this.repository.findByCode(code)
        
        if(exists){
            return new Error('Code is already in use')
        }

        const id = nanoid()
        
        const response = await this.repository.save({
            id, name, code, icon
        })

        if(response){
            return {id, name}
        }
        return new Error('Impossible to create new institution')
    }
  }