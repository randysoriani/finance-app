import { describe, it, expect, beforeEach } from "vitest";
import { IUserRepository } from "../../repositories/users";
import { UserRepositoryInMemory } from "../../repositories/inmemory/users";
import { DeleteUser } from "../../usecases/users/deleteuser";
import { nanoid } from "nanoid";

describe("Delete user use case", () => {
  const id = nanoid()
  const email = 'valid@mail.com'
  const password = 'password123'
  const repo: IUserRepository = new UserRepositoryInMemory()
  const sut = new DeleteUser(repo)

  beforeEach(()=>{
    repo.save({id, email, password})
  })

  it('Should create a new user', async () => {
    const response = await sut.execute(id)
    expect(response).toBeTruthy()
  })

  it('Should not create a new user if no email is provided', async () => {
    const id = "";
    const result = await sut.execute(id);
    expect(result).toBeInstanceOf(Error);
    expect(result).toHaveProperty('message');
  })

  it('Should not create a new user if email is already in use', async () => {
    const id = 'invalid_id'
    const result = await sut.execute(id);
    expect(result).toBeInstanceOf(Error);
    expect(result).toHaveProperty('message');
  })
})