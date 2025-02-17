import { Institution } from "../../entity/institution";
import { IInstitutionRepository } from "../intitutions";

export class InstitutionRepositoryInMemory implements IInstitutionRepository{
    private institutions: Institution[] = []

    async save(institution: Institution): Promise<boolean> {
        this.institutions.push(institution)
        return true
    }

    async findByCode(code: number){
        const institution = this.institutions.find(item => item.code === code)
        return institution
    }

    async findById(id: string): Promise<Institution | undefined> {
        const institution = this.institutions.find(item => item.id === id)
        return institution
    }

    async findAll(): Promise<Institution[] | undefined> {
        return this.institutions
    }

    async delete(id: string): Promise<boolean> {
        const exists = this.institutions.find(item => item.id === id)
        if(exists){
            this.institutions.filter(item => item.id === id)
            return true
        }
        return false
    }
}