import prisma from "database";
import { UserInput } from "repository";

export async function createUser(email:string, password?:string) {
    const userInfo: UserInput = {
        email,
        password: password || new Date().getTime().toString()
    }

    const user = await prisma.user.create({
        data: userInfo
    })

    return user;
}