import { describe, it, expect } from 'vitest'
import { CreateInstitution } from '../usecases/createinstitution'
import { InstitutionRepositoryInMemory } from '../repositories/inmemory/institutions'

describe('Create institution', () => {
    const name = 'Bank 1'
    const code = 201
    const icon = 'path/to/icon_img'

    const repo = new InstitutionRepositoryInMemory()
    const sut = new CreateInstitution(repo)

    it('Should successfully create a new istitution', async () => {
        const response = await sut.execute(name, code, icon)
        expect(response).toBeTruthy()
        expect(response).toHaveProperty('id')
        expect(response).toHaveProperty('name')
    })

    it('Should return error if no name is provided', async () => {
        const name = ''
        const response = await sut.execute(name, code, icon)
        expect(response).toBeInstanceOf(Error)
        expect(response).toHaveProperty('message')
        expect(response).toMatchObject({message: 'Missing mandatory params'})
    })

    it('Should return error if no code is provided', async () => {
        const code = NaN
        const response = await sut.execute(name, code, icon)
        expect(response).toBeInstanceOf(Error)
        expect(response).toHaveProperty('message')
        expect(response).toMatchObject({message: 'Missing mandatory params'})
    })

    it('Should return error if code is already in use', async () => {
        await sut.execute(name, code, icon)
        const response = await sut.execute(name, code, icon)
        expect(response).toBeInstanceOf(Error)
        expect(response).toHaveProperty('message')
        expect(response).toMatchObject({message: 'Code is already in use'})
    })

})
