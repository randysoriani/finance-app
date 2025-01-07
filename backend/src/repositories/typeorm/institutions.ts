import { appDataSource } from "..";
import { Institution } from "../../entity/institution";
import { IInstitutionRepository } from "../intitutions";
import { InstitutionsModel } from "../models/institutions";

export class InstitutionsRepositoryORM implements IInstitutionRepository{
    private repository = appDataSource.getRepository(InstitutionsModel)

    async save(institution: Institution): Promise<boolean> {
        const response = await this.repository.save({
            id: institution.id,
            name: institution.name,
            code: institution.code,
            icon: institution.icon
        })
        if(response){
            return true
        }

        return false
    }

    async findByCode(code: number): Promise<Institution | undefined> {
        const institution = await this.repository.findOneBy({code})
        if(institution){
            return institution
        }
        return
    }

    async findById(id: string): Promise<Institution | undefined> {
        const institution = await this.repository.findOneBy({id})
        if(institution){
            return institution
        }
        return
    }

    async findAll(): Promise<Institution[] | undefined> {
        const institutions = await this.repository.find()
        return institutions
    }

    async delete(id: string){
        const response = await this.repository.delete(id)
        if(response){
            return true
        }

        return false
    }
}