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
}