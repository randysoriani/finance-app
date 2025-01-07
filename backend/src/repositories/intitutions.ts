import { Institution } from "../entity/institution";

export interface IInstitutionRepository{
    save(institution: Institution): Promise<boolean>
    findByCode(code: number): Promise<Institution | undefined>
    findById(id: string): Promise<Institution | undefined>
    findAll(): Promise<Institution[] | undefined>
    delete(id: string): Promise<boolean>
}