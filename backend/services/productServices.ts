import { prisma } from "../../lib/prisma";

export class productServices {
    static async createProduct(req : any) {
        console.log(req);
        
        const e= await prisma.listing.create({
            data : {
                title : req.title ,
                description : req.description,
                type : req.type,
                // subType : req.subType,
                quantity : req.quantity,
                price : req.price,
                status : req.status,
                user : req.user,
                userId : req.userId
            }    
        })
        console.log(7);
        
        return e
    }
}