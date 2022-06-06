require('dotenv').config()
const mongoConnect = require('../../src/lib/mongoConnect')

describe('Test for mongo connection', () => {
    it('valid url', () => {
        mongoConnect.connectDB(process.env.MONGOCONNECTIONURL, async (err) => {
            expect(err).toBeUndefined()
            const client = mongoConnect.getDB()
            expect(client).toBeTruthy()
            const users = await client.collection("users").find({}).toArray();
            expect(users).toBeTruthy()
        });
    });

    it('invalid url', () => {
        mongoConnect.connectDB('some-random-url', (err) => {
            expect(err).toBeTruthy()
            const client = mongoConnect.getDB()
            expect(client).toBeNull()
        });
    });
});