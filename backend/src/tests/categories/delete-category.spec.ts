import { describe, it, expect, beforeAll } from 'vitest'
import { CategoriesRepositoryInMemory } from '../../repositories/inmemory/categories'
import { DeleteCategory } from '../../usecases/categories/deletecategory'
import { nanoid } from 'nanoid'

describe('Categories', () => {
    const id = nanoid()
    const name = 'Category 1'
    
    const repo = new CategoriesRepositoryInMemory()
    const sut = new DeleteCategory(repo)

    beforeAll(()=>{
        repo.save({id, name})
    })
    
    it('Should delete the category', async () => {
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
        expect(response).toMatchObject({message: 'Category not found'})
    })
})