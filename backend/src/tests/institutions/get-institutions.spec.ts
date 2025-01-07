import { nanoid } from "nanoid";
import { describe, it, expect } from "vitest";
import { InstitutionRepositoryInMemory } from "../../repositories/inmemory/institutions";
import { GetInstitutions } from "../../usecases/institutions/getinstitutions";

describe('Get institutions', () => {
    const inst1 = { id: nanoid(), name: 'Bank 1', code: 123 };
    const inst2 = { id: nanoid(), name: 'Broker 1', code: 456 };

    const repository = new InstitutionRepositoryInMemory();
    const sut = new GetInstitutions(repository);

    repository.save(inst1)
    repository.save(inst2)

    it('Should all institutions', async () => {
        const response = await sut.execute();
        expect(response).toBeTruthy();
        expect(response).toHaveProperty('institutions');
        expect(response.institutions).toHaveLength(2)
    });

    it('Should return just one institution', async () => {
        const response = await sut.execute(inst1.id)
        expect(response).toBeTruthy();
        expect(response).toHaveProperty('institution');
        expect(response.institution).toHaveProperty('id')
    })

    it('Should return an empty institution object if invalid id is provided', async () => {
        const id = 'invalid_id'
        const response = await sut.execute(id)
        expect(response.institution).toBeUndefined()
    })
});
