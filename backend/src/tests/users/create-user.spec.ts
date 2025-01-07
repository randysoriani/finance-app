import { describe, it, expect } from "vitest";
import { IUserRepository } from "../../repositories/users";
import { UserRepositoryInMemory } from "../../repositories/inmemory/users";
import { CreateUser } from "../../usecases/users/createuser";

describe("Create user use case", () => {
  const email = 'valid@mail.com'
  const password = 'password123'
  const repo: IUserRepository = new UserRepositoryInMemory()
  const sut = new CreateUser(repo)

  it('Should create a new user', async () => {
    const response = await sut.execute(email, password)
    expect(response).toBeTruthy()
    expect(response).toHaveProperty('id')
    expect(response).toHaveProperty('accessToken')
    expect(response).toHaveProperty('refreshToken')
  })

  it('Should not create a new user if no email is provided', async () => {
    const email = "";
    const result = await sut.execute(email, password);
    expect(result).toBeUndefined();
  })

  it('Should not create a new user if no password is provided', async () => {
    const password = "";
    const result = await sut.execute(email, password);
    expect(result).toBeUndefined();
  })

  it('Should not create a new user if email is already in use', async () => {
    await sut.execute(email, password);
    const result = await sut.execute(email, password);
    expect(result).toBeUndefined();
  })
})