import { prisma } from "../../lib/prisma";

export class productServices {
    static async createProduct(req : any) {
        
        return await prisma.listing.create({
            data : {
                title : req.title ,
                description : req.description,
                type : req.type,
                subType : req.subType,
                quantity : req.quantity,
                price : req.price,
                status : req.status,
                userId : req.userId
            }    
        })
    }
    static async getProducts(){
        return await prisma.listing.findMany({})
    }

    static async updateProduct(product : any , updateData : any) {
        
        return await prisma.listing.update({
            where : {
                id : product.id,
            },
            data :{
                ...updateData,
                updatedAt :new Date(Date.now())
            }
        })
    }

    static async getProduct(id : number){
        console.log(id);
        
        return await prisma.listing.findUnique({
            where : {
                id
            },
        })        
        
    }

    static async deleteProduct(id : number){
        console.log(8,id);
        
        return await prisma.listing.delete({
            where : {
                id
            }
        })        
    }
}