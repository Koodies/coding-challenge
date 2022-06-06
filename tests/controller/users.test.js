const { addUser } = require('../../src/controller/users')

//TODO: add mongodb mock

describe('Test for users controller', () => {
    it('create new user', async () => {
        const email = 'test1@gmail.com'
        const password = 'P@ssw0rd'
        const result = await addUser(email, password)
        expect(result).toBeTruthy()
    });
});