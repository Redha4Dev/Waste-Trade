import {NextRequest , NextResponse} from 'next/server'
import {prisma} from '@/lib/prisma'
import { AuthMiddleware } from "../middleware/auth";
import { errorHandler } from '../utils/errorHandler';
import { appError } from '../utils/appError';

import {productServices} from '@/backend/services/productServices'
import { success } from 'zod';

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
        console.log(6);
        
        const product = await productServices.createProduct(req)
        console.log(product);
        console.log('success');
        
        return NextResponse.json(
            {success : true ,data : product },
            {status : 201}
        )
    }
)}