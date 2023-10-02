import supertest from "supertest";
import app from "./../src/app";
import prisma from "../src/database";
import { UserInput } from "repository";

const api = supertest(app);

beforeEach(async () => {
  await prisma.user.deleteMany();
});

describe("POST /users tests", () => {
  it("should create a user", async () => {
    const user: UserInput = { 
      email: "a@a.com",
      password: "123456"
    };

    const {status} = await api.post('/users').send(user);
    
    expect(status).toBe(201);
  });

  it("should receive 409 when trying to create two users with same e-mail", async () => {
    const user: UserInput = { 
      email: "a@a.com",
      password: "123456"
    };

    await prisma.user.create({
      data: user
    });

    const {status} = await api.post('/users').send(user);
    
    expect(status).toBe(409)

  });

});

describe("GET /users tests", () => {
  it("should return a single user", async () => {
    const user: UserInput = { 
      email: "a@a.com",
      password: "123456"
    };

    const createdUser = await prisma.user.create({
      data: user
    });

    const {status, body} = await api.get(`/users/${createdUser.id}`);

    expect(status).toBe(200);

    expect(body).toEqual({
      email: "a@a.com",
      password: "123456",
      id: createdUser.id
    })

  });

  it("should return 404 when can't find a user by id", async () => {
    const {status} = await api.get('/users/1111111');

    expect(status).toBe(404);
  });

  it("should return all users", async () => {
    const user: UserInput = { 
      email: "a@a.com",
      password: "123456"
    };
    
    const user2: UserInput = { 
      email: "b@b.com",
      password: "123456"
    };

    await prisma.user.createMany({
      data: [
        {
          ...user
        },
        {
          ...user2
        }
      ]
    });

    const {status, body} = await api.get('/users');

    expect(status).toBe(200);

    expect(body).toHaveLength(2);

    expect(body).toEqual(expect.arrayContaining([
      expect.objectContaining({
        email: expect.any(String)
      })
    ]))
  });

})