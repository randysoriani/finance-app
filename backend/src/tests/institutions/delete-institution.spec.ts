import { nanoid } from 'nanoid'
import { describe, it, expect, beforeAll } from 'vitest'
import { InstitutionRepositoryInMemory } from '../../repositories/inmemory/institutions'
import { DeleteInstitution } from '../../usecases/institutions/deleteinstitution'

describe('Delete institution', () => {
    const id = nanoid()
    const name = 'Bank1'
    const code = 123

    const repo = new InstitutionRepositoryInMemory()
    const sut = new DeleteInstitution(repo)

    beforeAll(()=>{
        repo.save({id, name, code})
    })

    it('Should delete a valid institution', async () => {
        const response = await sut.execute(id)
        expect(response).toBeTruthy()
    })

    it('Should return error if not id is provided', async () => {
        const id = ''
        const response = await sut.execute(id)
        expect(response).toBeInstanceOf(Error)
        expect(response).toHaveProperty('message')
        expect(response).toMatchObject({message: 'Missing mandatory param'})
    })

    it('Should return error if institution dont exists', async () => {
        const id = 'invalid'

        const response = await sut.execute(id)
        expect(response).toBeInstanceOf(Error)
        expect(response).toHaveProperty('message')
        expect(response).toMatchObject({message: 'Institution not found'})
    })


})
