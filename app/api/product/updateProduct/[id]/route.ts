import productController from '@/backend/controllers/productController'
import { NextRequest } from 'next/server'
export async function PATCH(request : NextRequest , context : { params : {token : number}}){
    return productController.updateProduct(request, context)
}