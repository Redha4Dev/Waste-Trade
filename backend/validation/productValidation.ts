const WasteType = ['plastic','metal','organic']
const itemStatus = ['available' , 'sold' , 'reserved']
import { toLowerCase } from 'zod'
import {prisma} from '../../lib/prisma'


export class productValidation {
    static async validateProduct(product : any){
        console.log('validation');
        
        const errors = []
        const totalUsers = await prisma.user.count()

        const {title , description , type , quantity , price , status ,userId  } = product

        if (!title || typeof title !== "string" || title.trim().length === 0) {
            errors.push('title is required field please enter title of your product')
        }

        if (!description || typeof description !== "string" ) {
            errors.push('description required field')
        }
        if (!type || !WasteType.includes(type)  ) {
            errors.push('type is required field please enter title of your product')
        }

        if (!status || !itemStatus.includes(status) ) {
            errors.push('item status required field')
        }
        if (!quantity || typeof quantity !== "number"  ) {
            errors.push('quantity is required field please enter title of your product')
        }

        if (!price || typeof price !== "number" ) {
            errors.push('price is required field')
        }

        if(!userId || typeof userId !== 'number' || userId > totalUsers){
            errors.push('user Id is does not exists')
        }
        
        return errors
    }

    static async sanitizeProduct(product : any){
        return{
            title : product.title?.trim().toLowerCase(),
            description : product.description?.trim(),
            type : product.type?.trim().toLowerCase(),
            subType : product.title?.trim().toLowerCase(),
            quantity : product.quantity? parseFloat(product.quantity) : 0.0 ,
            price : product.price ? parseFloat(product.price) : 0.0 ,
            status : product.status?.trim().toLowerCase(),
            userId : product.userId
        }
        
    }
}