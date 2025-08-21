import { prisma } from "../../lib/prisma";
import { NextRequest , NextResponse } from "next/server";
import {AuthServices} from '../services/authServices'
import {cookies} from 'next/headers'
import validator from 'validator'
import { crypto } from "crypto";
import { Validation } from "../middleware/validation";
import { errorHandler } from "../utils/errorHandler";
import { appError } from "../utils/appError";

export class AuthController {
     static signup =  errorHandler(async (request : NextRequest)=>{
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
                        name : newUser.username,
                        email : newUser.email
                    }
                },
                {status: 200}
            )
    })

    //account verification function
    static verificationCode = errorHandler(async (request : NextRequest)=>{
        const body = request.json()
        //get user from db based on the email
        const user = await AuthServices.getUserByEmail(body.email)

        //chekc if the user exists
        if(!user) {
            throw new appError('user account verifies or does not exists please signUp' ,404)
        }

        //generate the verification Code
        const verificationCode = await AuthServices.verificationCode(body.email)

        //create the email
        //1- create the url
        const url = `https://localhost/3000/verify/${verificationCode}`

        //2- create the email message
        const message = `verification for your Account ${verificationCode}. \n please ignore the email if your account is verified` 

        //3- sending email 
        Email({
            subject:'Verification Code',
            email : body.email,
            message
        })

        return NextResponse.json(
            {
                success : true,
                message : 'check your email' 
            }
        )
    }) 

    //vetify account function

    static verifyAccount = errorHandler(async (request : NextRequest) =>{
        const body = request.json()
        //get the user from the database
        const verificationCode = crypto.createHash('sha256').update(body.verificationCode).digest('hex')

        const user = await AuthServices.getUserByEmailAndCode(email , verificationCode)
    })
    static login = errorHandler (async (request:NextRequest)=> {
            const {email , password} = await request.json()
            if (!email || !password) {
                 throw new appError('fields required' , 400)
            }

            //check if the user exists
            const user = await prisma.user.findUnique({
                where : {email}
            })
            console.log(user);
            
            if (!user) {
                throw new appError('user not found please signup' , 404)
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

            const token = await AuthServices.createToken(user.username , user.id);
            
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
                        id : user.id,
                        name : user.username,
                        email : user.email,
                        token 
                    }
                },
                {status: 200}
            )
    })
}