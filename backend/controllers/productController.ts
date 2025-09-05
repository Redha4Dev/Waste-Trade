import {NextRequest , NextResponse} from 'next/server'
import {prisma} from '@/lib/prisma'
import { AuthMiddleware } from "../middleware/auth";
import { errorHandler } from '../utils/errorHandler';
import { appError } from '../utils/appError';
import {productValidation} from '../validation/productValidation'
import {productServices} from '@/backend/services/productServices'

export default class ProductController {
    static createProduct = errorHandler( async (request : NextRequest)=>{

        //verify user
        await AuthMiddleware.protectRoute(request)
        const user =  request.user
        console.log(user);

        if(!user) {
            return new appError('user not found please logIn or signUp', 404)
        }

        //parsing request
        
        const req = await request.json()
        
        const sanitizeProduct = await productValidation.sanitizeProduct(req);

        const errors = await productValidation.validateProduct(sanitizeProduct)

        if (errors.length > 0) {
            errors.forEach(error => {
                
                return new appError(error , 400)
            });
        }
        console.log('ppp');
        
        const product = await productServices.createProduct(sanitizeProduct)
        console.log(product);
        console.log('success');
        
        return NextResponse.json(
            {success : true ,data : product },
            {status : 201}
        )
    }
)}