import { prisma } from "../../lib/prisma";

export class userServices {
    
    static async createUser (request : any) {
        console.log('creating');
        return await prisma.user.create({
            data :{
                username : request.username,
                email : request.email,
                password : request.password,
                role :request.role
            }
        })
    }

    //get user
    //the function will return the whole user document 
    static async getUser (id : number) {
        
        return await prisma.user.findUnique({
            where : {
                id : id
            },
            select : {
                id : true,
                username : true,
                email : true,
                password : false
            }
        })
        
        
    }

    //get all users
    static async getAllUsers(){
        return await prisma.user.findMany({})
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