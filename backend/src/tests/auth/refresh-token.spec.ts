import { describe, expect, it } from "vitest";
import jwt from 'jsonwebtoken'
import { RefreshTokens } from "../../usecases/auth/refreshtokens";

describe('Refresh token', () => {
    const refreshToken = jwt.sign({}, String(process.env.JWT_SECRET), { expiresIn: 60 * 60 * 24 * 30 })
    const invalidToken = jwt.sign({}, String(process.env.JWT_SECRET), { expiresIn: -60 * 60 * 24 * 30 }) 
    const sut = new RefreshTokens()

    it('Should return a new access and refresh token', async () => {
        const response = await sut.execute(refreshToken)
        expect(response).toBeTruthy()
        expect(response).toHaveProperty('accessToken')
        expect(response).toHaveProperty('refreshToken')
    })

    it('Should return a new access and refresh token', async () => {
        const refreshToken = ''
        const response = await sut.execute(refreshToken)
        expect(response).toBeInstanceOf(Error)
        expect(response).toHaveProperty('message')
        expect(response).toMatchObject({message: 'Missing mandatory param'})
    })

    it('Should return a new access and refresh token', async () => {
        const response = await sut.execute(invalidToken)
        expect(response).toBeInstanceOf(Error)
        expect(response).toHaveProperty('message')
        expect(response).toMatchObject({message: 'Token invalid'})
    })
})