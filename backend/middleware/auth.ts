import {prisma} from '@/lib/prisma'
import { NextRequest , NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import {appError} from '../utils/appError'
import { errorHandler } from '../utils/errorHandler'


export class AuthMiddleware {

    //parsing the request
    static async parsingRequest (request : NextRequest){
        return  await request.json()
    }
    //verifying token
    static async verifyToken(token : string) {
        return await jwt.decode(token , process.env.JWT_SECRET )
    }

    //authorization function
    static async verifyAuthorization(request : NextRequest ,roles : any) {

        //get the user from the db
        const user = await prisma.user.findUnique({
            where :{
                username : request.user?.username,
                email : request.user?.email,
                id : request.user?.id
            },
            select : {
                role : true
            }
        })

        //check if the user role is accepted
        if (!roles.includes(user?.role)) {
            throw new appError('user not allowed to access this routes' , 400)
        }

        return NextResponse.next()
    }

    //protect routes function
    static async protectRoute (request : NextRequest){
        const token = request.cookies.get('jwt')?.value        
console.log(request);

        //check if the token exists
        if(!token) {
            throw NextResponse.json(
                {success : false , message :'token not exists please login or signup'},
                {status :404}
            ) 
        }

        try { 
            //decode the token
            
            const decoded = await this.verifyToken(token)
            
            if (!decoded) {
                throw next (new appError('token not valid dirha fi darkm hadi' , 400))
            }
    
            //get the user
            const user = await prisma.user.findUnique({
                where :{
                    username : decoded.name,
                    id: decoded.id
                },
                select :{
                    username :true,
                    id : true,
                    email : true
                }
            })
     
            
            if(!user) {
                return NextResponse.json({ success:false , message: "User not found" }, { status: 404 });
            }
            request.user = user
    
            return NextResponse.next()
        } catch (err) {
            console.log(err);
            
        }
    }
}