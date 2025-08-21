import { prisma } from "../../lib/prisma";
import { NextRequest , NextResponse } from "next/server";
import {AuthServices} from '../services/authServices'
import {cookies} from 'next/headers'
import validator from 'validator'
import { Validation } from "../middleware/validation";
import bcrypt from 'bcrypt'



export class AuthController {
     static async signup(request : NextRequest){
        try {
            //to be finished later
            //get user data from the response
            console.log(1);
            
            const body = await request.json()
            console.log(body);
            //validate and sanitize data
            const validEmail = Validation.validateEmail(body.email)
            const validPassword = Validation.validatePassword(body.password)
            
            if (!validEmail.success ) {
                return NextResponse.json(
                    {success : false , error : 'email Validation failed'},
                    {status : 400}
                )
            }
            if (!validPassword ) {
                return NextResponse.json(
                    {success : false , error : 'password Validation failed'},
                    {status : 400}
                )
            }
            
            if (!validator.equals(body.password , body.confirmPassword)) {
                return NextResponse.json(
                    {success : false , error : 'passwords are not the same'},
                    {status : 400}
                )
            }
            
            //create user
            const newUser = await prisma.user.create({
                data :{
                    username : body.username,
                    email : validEmail.data,
                    password : await AuthServices.hashPassword(body.password),
                }
            })
            //generate token && setting cookies
            
            const token = AuthServices.createToken(newUser.username , newUser.id)

            const cookieOptions = AuthServices.cookiesOptions();
            const cookieStore = await cookies();
            cookieStore.set({
                name: "jwt",
                value: token,
                ...cookieOptions,
            });
            //send response
            console.log(newUser);
            
            return NextResponse.json(
                {
                    success : true,
                    message : 'SIGNUP success',
                    data :{
                        newUser
                    }
                },
                {status: 200}
            )
        } catch (error) {
            console.log(error);
            
        }
    }
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
            console.log(correct);
            
            if (!correct) {
                return NextResponse.json(
                    {success : false , error : 'password incorrect'},
                    {status : 400}
                )
            }

            //generate the token for the user && setting cookies

            const token = AuthServices.createToken(user.username , user.id);
            
            const cookieOptions = AuthServices.cookiesOptions();
            const cookieStore = await cookies();
            cookieStore.set({
                name: "jwt",
                value: token,
                ...cookieOptions,
            });
            //send the response
            return NextResponse.json(
                {
                    success : true,
                    message : 'login success',
                    data :{
                        user
                    }
                },
                {status: 200}
            )
        } catch (err) {
            console.log(err);
            
        }
    }
}