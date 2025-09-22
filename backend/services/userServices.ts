import { prisma } from "../../lib/prisma";

export class userServices {
    static async createUser (request : any) {
        return await prisma.user.create({
            data :{
                username : request.username,
                email : request.email,
                password : request.password,
                role :request.role
            }
        })
    }

    //update user
    static async updateUser(id : number , updatedData : any){
        return await prisma.user.update({
            where : {
                id : id
            },
            data : {
                ...updatedData
            }
        })
    }

    //delete user
    static async deleteUser(id: number){
        return await prisma.user.delete({
            where : {
                id : id
            }
        })
    }
}