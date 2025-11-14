import {prisma} from '../../lib/prisma'
import {errorHandler} from '../utils/errorHandler'
import {appError} from '../utils/appError'
import { NextRequest , NextResponse } from 'next/server'
import { AuthMiddleware } from '../middleware/auth'
import { userServices } from '../services/userServices'
import { request } from 'http'
import { userValidation } from '../validation/userValidation'
export class userController {
    
    //to be used in the dashboard
    static  UserInfo = errorHandler (async (request : NextRequest)=>{
        //protect route

        await AuthMiddleware.protectRoute(request)
        console.log( request.user.id);
        
        const user = await userServices.getUser(request.user.id)

        if (!user) {
            throw new appError('user nt found please trey to verify your credentials' ,404)
        }

        return NextResponse.json(
            {success :true , user},
            {status:200}
        )
    })


    //get all users
    //used by the admin
    static async getAllUsers (request : NextRequest){

        //protect route
        await AuthMiddleware.protectRoute(request)

        console.log(44);
        
        const users = await userServices.getAllUsers()

        return NextResponse.json(
            {success : true , users},
            {status: 200}
        )
    }



    static async updateUser(request :NextRequest) {
console.log(3);

        //protect route
        await AuthMiddleware.protectRoute(request)

        //get the user
        const user = await userServices.getUser(request.user?.id)

        if (!user) {
            throw new appError('user does not exist', 404)
        }

        let updatedData = await AuthMiddleware.parsingRequest(request)

        updatedData =  userValidation.sanitizeUserData(updatedData)

        const errors = userValidation.validateData(updatedData)
        
        if (errors.length !== 0) {
            return NextResponse.json(
                {success : false , error : errors.join('; ')},
                {status : 400}
            )
        }
        
         await userServices.updateUser(user.id , updatedData)

        return  NextResponse.json(
            {success : true , user},
            {status : 200}
        )
    }

    static deleteUser =errorHandler (async (request : NextRequest)=>{
        
        //protect route
        await AuthMiddleware.protectRoute(request)

        const user = await userServices.deleteUser(request.user.id)

        console.log(user);

        return NextResponse.json(
            {success : true },
            {status : 204}
        )
        
        
    })
}