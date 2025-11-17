//DataBase imports
import {prisma} from '../../lib/prisma'

//middlewares
import {errorHandler} from '../utils/errorHandler'
import {appError} from '../utils/appError'
import { AuthMiddleware } from '../middleware/auth'

//next.js imports
import { NextRequest , NextResponse } from 'next/server'

//user services and validation
import { userServices } from '../services/userServices'
import { userValidation } from '../validation/userValidation'
import { error } from 'console'


export class userController {
    
    //to be used in the dashboard
    static  UserInfo = errorHandler (async (request : NextRequest)=>{
       
        //protect route
        await AuthMiddleware.protectRoute(request)
        const user = await userServices.getUser(request.user.id)

        if (!user) {
            return NextResponse.json(
                {success :false , message : 'Unauthorized: User does not exist'},
                {status : 401}
            )
        }

        return NextResponse.json(
            {success :true , user},
            {status:200}
        )
    })


    //get all users
    //used by the admin
    static getAllUsers = errorHandler(async (request : NextRequest)=>{

        //protect route and authorization
        await AuthMiddleware.protectRoute(request)
        await AuthMiddleware.verifyAuthorization(request , ['admin'])
                
        const users = await userServices.getAllUsers()

        return NextResponse.json(
            {success : true , users},
            {status: 200}
        )
    })


    //update user function
    static updateUser = errorHandler(async (request :NextRequest) =>{

        //protect route
        await AuthMiddleware.protectRoute(request)

        //get the user
        const user = await userServices.getUser(request.user.id)

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
    })

    //delete user function
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