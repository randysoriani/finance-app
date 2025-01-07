import { nanoid } from "nanoid";
import { IAccountRepository } from "../../repositories/account";
import { IUserRepository } from "../../repositories/users";
import { IInstitutionRepository } from "../../repositories/intitutions";

export class CreateAccount{
    constructor(private readonly repository: IAccountRepository, 
                private readonly userRepository: IUserRepository,
                private readonly institutionRepository: IInstitutionRepository){}

    async execute(name: string, agency: number, account: number, user_id: string, institution_id: string, desc?: string,){
        if(!name || !agency || !account || !user_id || !institution_id){
            return new Error('Missing mandatory params')
        }

        const id = nanoid()

        const user = await this.userRepository.findById(user_id)
        const institution = await this.institutionRepository.findById(institution_id)

        if(!user || !institution){
            return new Error('Linked user or institution not found')
        }

        const acc = {id, user_id, institution_id, name, description: desc, agency, account}

        const response = await this.repository.save(acc)
        if (response){
            return {acc}
        }
        return false        
    }
}