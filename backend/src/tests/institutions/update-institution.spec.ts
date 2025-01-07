import { nanoid } from "nanoid";
import { describe, it, expect, beforeEach } from "vitest";
import { InstitutionRepositoryInMemory } from "../../repositories/inmemory/institutions";
import { UpdateInstitution } from "../../usecases/institutions/updateinstitution";

describe('Update institution', () => {
    const id = nanoid()
    const name = 'Bank 1'
    const code = 123

    const repo = new InstitutionRepositoryInMemory()
    const sut = new UpdateInstitution(repo)

    beforeEach( async ()=> {
        await repo.save({id, name, code})
    })

    it('Should update the name of an institution', async () => {
        const new_name = 'New Bank'
        const response = await sut.execute(id, new_name)
        expect(response).toBeTruthy()
        expect(response).toHaveProperty('name')
        expect(response).toMatchObject({name: new_name})
    })

    it('Should return Institution not found if no institution is found', async () => {
        const id = 'invalid_id'
        const response = await sut.execute(id)
        expect(response).toBeInstanceOf(Error)
        expect(response).toHaveProperty('message')
        expect(response).toMatchObject({message: 'Institution not found'})
    })

    it('Should return Missing mandatory param if no id is provided', async () => {
        const id = ''
        const response = await sut.execute(id)
        expect(response).toBeInstanceOf(Error)
        expect(response).toHaveProperty('message')
        expect(response).toMatchObject({message: 'Missing mandatory param'})
    })
})