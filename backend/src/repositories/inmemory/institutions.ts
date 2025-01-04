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
}