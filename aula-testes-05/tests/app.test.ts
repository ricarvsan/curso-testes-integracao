import supertest from "supertest";

import app from "./../src/app";

const api = supertest(app);

describe("API test", () => {
  it("should return 200 when ask /health", async () => {
    const { status, text } = await api.get("/health");
    expect(status).toBe(200);
    expect(text).toBe("OK!");
  })

  it('should return 400 when ask /fibonacci and elements is NaN', async () => {
    const {status} = await api.get('/fibonacci?elements=text')
    expect(status).toBe(400);
  })

  it('should return 400 when ask /fibonacci and there are not elements', async () => {
    const {status} = await api.get('/fibonacci')
    expect(status).toBe(400);
  })

  it('should return 400 when ask /fibonacci and elements is 0 or less', async () => {
    const {status} = await api.get('/fibonacci?elements=-1')
    expect(status).toBe(400);
  })

  it('should return 200 when ask /fibonacci and elements is valid', async () => {
    const {status} = await api.get('/fibonacci?elements=10')
    expect(status).toBe(200);
  })

  it('should return 200 when ask /fibonacci and elements is valid', async () => {
    const {status, body} = await api.get('/fibonacci?elements=5')
    expect(status).toBe(200);
    expect(body).toEqual([0, 1, 1, 2, 3])
    expect(body).toHaveLength(5)
  })
})