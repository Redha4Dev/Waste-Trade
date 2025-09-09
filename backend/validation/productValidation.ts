const WasteType = ['plastic','metal','organic']
const itemStatus = ['available' , 'sold' , 'reserved']

import {z} from 'zod'

const productSchema = z.object({
  title: z.string().min(1, "title is required"),
  description: z.string().min(1, "description is required"),
  type: z.enum(WasteType, { message: "invalid type" }),
  status: z.enum(itemStatus, { message: "invalid status" }),
  quantity: z.number().positive("quantity must be a number >= 0"),
  price: z.number().positive("price must be a number >= 0"),
  userId: z.number().positive("invalid user id")
});

const updateProductSchema = productSchema.partial()
export class productValidation {
    static async validateProduct(product : any){
        const errors : string[] = []
        const result = productSchema.safeParse(product)
        
        if (!result.success) {
            result.error.issues.forEach(e => {
                errors.push(e.message )
            });
        }
        
        return errors
    }
    static async validateUpdateProduct(product : any){
        const errors : string[] = []
        const result =  updateProductSchema.safeParse(product)
        
        if (!result.success) {
            result.error.issues.forEach(e => {
                errors.push(e.message )
            });
        }
        
        return errors
    }

    static async sanitizeProduct(product : any){
        console.log(product);
        
        return{
            title : product.title?.trim().toLowerCase(),
            description : product.description?.trim(),
            type : product.type?.trim().toLowerCase(),
            subType : product.title?.trim().toLowerCase(),
            quantity : product.quantity? parseFloat(product.quantity) : 1.0 ,
            price : product.price ? parseFloat(product.price) : 1.0 ,
            status : product.status?.trim().toLowerCase(),
            userId : product.userId
        }
        
    }
}