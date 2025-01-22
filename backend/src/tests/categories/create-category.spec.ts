import { describe, it, expect } from 'vitest'
import { CategoriesRepositoryInMemory } from '../../repositories/inmemory/categories'
import { CreateCategory } from '../../usecases/categories/createcategory'

describe('Caetgories', () => {
    const repo = new CategoriesRepositoryInMemory()
    const sut = new CreateCategory(repo)
    const name = 'Category 1'

    it('Should create a new category', async () => {
        const response = await sut.execute(name)
        expect(response).toBeTruthy()
        expect(response).toHaveProperty('id')
        expect(response).toHaveProperty('name')
    })

    it('Should return error if no name is provided', async () => {
        const name = ''
        const response = await sut.execute(name)
        expect(response).toBeInstanceOf(Error)
        expect(response).toHaveProperty('message')
        expect(response).toMatchObject({message: 'Missing mandatory param'})
    })

    it('Should return error if name is already in use', async () => {
        await sut.execute(name)
        const response = await sut.execute(name)
        expect(response).toBeInstanceOf(Error)
        expect(response).toHaveProperty('message')
        expect(response).toMatchObject({message: 'Category name is already in use'})
    })
})