import {NextRequest , NextResponse} from 'next/server'
import {prisma} from '@/lib/prisma'
import { AuthMiddleware } from "../middleware/auth";
import { errorHandler } from '../utils/errorHandler';
import { appError } from '../utils/appError';
import {productValidation} from '../validation/productValidation'
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
    })

    static updateProduct = errorHandler(async (request : NextRequest , context : {params : {id : number}})=>{
        //get the user
        await AuthMiddleware.protectRoute(request)
        const user = request.user

        console.log(user);
        
        //parsing body
        
        //get the product
        const {id} = await context.params
        
        const product = await productServices.getProduct(Number(id))
        console.log(product);
        
        //get updated data
        const updatedData = await request.json()
        console.log(updatedData);
        
        //sanitize and update data
        const updatedProduct = await productServices.updateProduct(product , updatedData)
        const sanitizeData = await productValidation.sanitizeProduct(updatedProduct)
        const errors = await productValidation.validateUpdateProduct(sanitizeData)

        console.log(errors);
        
        // if (errors.length > 0) {
        //     return new appError(errors.forEach(e => {
        //         return e
        //     }), 404)
        // }
        
        console.log(77,updatedProduct);
        
        return new NextResponse(
            null,
            {status : 204}
        )
    })

    static getAllProducts = errorHandler(async (request : NextRequest)=>{
        //get the user
        await AuthMiddleware.protectRoute(request)

        const products = await productServices.getProducts()

        return NextResponse.json(
            {success: true , products},
            {status: 200}
        )
    })
    static deleteProduct = errorHandler(async( request : NextRequest)=>{

        //get the user
        await AuthMiddleware.protectRoute(request)
        const user = request.user

        if (!user) {
            return new appError('user not found please logIn or signUp' , 404)
        }

        //parsing the request
        const body = await request.json()

        //get the product from the db
        const product = await productServices.getProduct(body)

        if (!product) {
            return new appError('product does not exist' , 404)
        }

        const p = await productServices.deleteProduct(product)

        return NextResponse.json(
            {success : true , data : p},
            {status : 204}
        )
    })
}