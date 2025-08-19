import { prisma } from "../../lib/prisma";
import { NextRequest , NextResponse } from "next/server";
import {AuthServices} from '../services/authServices'
import {cookies} from 'next/headers'

export class AuthController {
   
    static async login (request:NextRequest) {
        try {
            const {email , password} = await request.json()
            if (!email || !password) {
                return NextResponse.json(
                    {success : false , error : 'fields required'},
                    {status: 400}
                )
            }

            //check if the user exists
            const user = await prisma.user.findUnique({
                where : {email}
            })

            if (!user) {
                return NextResponse.json(
                    {success : false , error : 'user not found'},
                    {status: 404}
                )
            }
            //check if the password is correct
            const correct = await AuthServices.correctPassword(password , user.password)
            if (!correct) {
                return NextResponse.json(
                    {success : false , error : 'password incorrect'},
                    {status : 400}
                )
            }

            //generate the token for the user && setting cookies

            const token = AuthServices.createToken(user.username , user.id);
            const cookieOptions = AuthServices.cookiesOptions();
            const cookie = cookies()
            
            await cookie.set({
                name : 'jwt',
                value : token,
                ...cookieOptions,
            })
            //send the response
            NextResponse.json(
                {
                    success : true,
                    message : 'login success',
                    data :{
                        id: user.id,
                        username : user.username
                    }
                },
                {status: 200}
            )
        } catch (err) {
            console.log(err);
            
        }
    }
}