import {NextRequest , NextResponse} from 'next/server'
import {prisma} from '@/lib/prisma'
import { AuthMiddleware } from "../middleware/auth";
import { errorHandler } from '../utils/errorHandler';
import { appError } from '../utils/appError';
import {productValidation} from '../validation/productValidation'
import {productServices} from '@/backend/services/productServices'
import { Brygada_1918 } from 'next/font/google';

export default class ProductController {

    //create product operation
    static createProduct = errorHandler( async (request : NextRequest)=>{

        //verify user
        await AuthMiddleware.protectRoute(request)
        const user =  request.user
        console.log(user);

        if(!user) {
            return new appError('user not found please logIn or signUp', 404)
        }

        //parsing request
        
        const req = await AuthMiddleware.parsingRequest(request)
        
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

    //update product operation
    static updateProduct = errorHandler(async (request : NextRequest , context : {params : {id : number}})=>{
        //get the user
        await AuthMiddleware.protectRoute(request)
        const user = request.user

        console.log(user);
        
        //parsing body
        
        //get the product
        const {id} =  context.params
        
        const product = await productServices.getProduct(Number(id))
        console.log(product);
        
        //get updated data
        const updatedData = await await AuthMiddleware.parsingRequest(request)
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

    //get all products operation
    static getAllProducts = errorHandler(async (request : NextRequest)=>{
        //protect routes
        await AuthMiddleware.protectRoute(request)

        const products = await productServices.getProducts()

        return NextResponse.json(
            {success: true , products},
            {status: 200}
        )
    })

    //get product operation
    static getProduct = errorHandler(async (request : NextRequest, context : {params : {id : number}})=>{
        //protect routes
        console.log(3);
        
        await AuthMiddleware.protectRoute(request)

        
        //get the id from the request params
        const {id} = await context.params
        
        
        //get the product from the db
        const product = await productServices.getProduct(Number(id))

        console.log(product);
        
        return NextResponse.json(
            {success : true , product},
            {status : 200}
        )
    })

    //delete product operation
    static deleteProduct = errorHandler(async( request : NextRequest)=>{

        //get the user
        await AuthMiddleware.protectRoute(request)
        const user = request.user

        if (!user) {
            return new appError('user not found please logIn or signUp' , 404)
        }

        //parsing the request
        const body = await await AuthMiddleware.parsingRequest(request)

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