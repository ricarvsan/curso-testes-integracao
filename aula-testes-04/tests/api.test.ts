import app from "index"
import supertest from "supertest"

const server = supertest(app);

describe('api', () => {
    it('/health', async () => {
        const result = await server.get('/health');
        const { statusCode, text } = result;

        expect(statusCode).toBe(200)
        expect(text).toBe('OK!')
    })
})