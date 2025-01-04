import { Institution } from "../entity/institution";

export interface IInstitutionRepository{
    save(institution: Institution): Promise<boolean>
    findByCode(code: number): Promise<Institution | undefined>
}