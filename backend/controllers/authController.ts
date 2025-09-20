// prisma/next 
import { prisma } from "../../lib/prisma";
import { NextRequest , NextResponse } from "next/server";

//utils
import {AuthServices} from '../services/authServices'
import {cookies} from 'next/headers'

//npm & built in packages
import validator from 'validator'
import  crypto  from "crypto";

//middlewares
import {AuthMiddleware} from '../middleware/auth'
import { userValidation } from "../validation/userValidation";
import {sendEmail} from '../middleware/mail'

//services & imports
import { errorHandler } from "../utils/errorHandler";
import { appError } from "../utils/appError";

export class AuthController {
     static signup =  errorHandler(async (request : NextRequest ,response : NextResponse)=>{
            //to be finished later
            //get user data from the response
            console.log(1);
            
            const body = await request.json()
            console.log(body);
            //validate and sanitize data
            const validEmail = userValidation.validateEmail(body.email)
            const validPassword = userValidation.validatePassword(body.password)
            
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
                    role :body.role
                }
            })
            //generate token && setting cookies
            
            const token = AuthServices.createToken(newUser.username , newUser.id)

            const cookieOptions = AuthServices.cookiesOptions();
            const cookieStore = cookies();
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
    static verificationCode = errorHandler(async (request : NextRequest ,response : NextResponse)=>{
        const body =await request.json()
        //get user from db based on the email
        const user = await AuthServices.getUserByEmail(body.email)

        //check if the user exists
        if(!user) {
            throw new appError('user account verifies or does not exists please signUp' ,404)
        }
        console.log(user);
        
        //generate the verification Code
        const verificationCode = await AuthServices.verificationCode(body.email)
        console.log(verificationCode);
        
        //create the email
        //1- create the url
        const url = `https://localhost/3000/verify/${verificationCode}`

        //2- create the email message
        const message = `verification for your Account ${verificationCode}. follow this like to verify your account ${url} \n please ignore the email if your account is verified` 

        //3- sending email 
        sendEmail({
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

    //verify account function

    static verifyAccount = errorHandler(async (request : NextRequest ,response : NextResponse)=>{
        
        const body = await request.json() 
        //get the user from the database
        const verificationCode = crypto.createHash('sha256').update(body.verificationCode).digest('hex')
        console.log(verificationCode);
        
        const user = await AuthServices.getUserByEmailAndCode(body.email , verificationCode)
        console.log(user);
        
        //check if the user exists
        if (!user) {
            throw new appError('user Does not exists or verified account' , 404)
        }

        //update the user
        await prisma.user.update({
            where :{
                email : body.email,
                verificationCode
            },
            data : {
                isVerified : true,
                verificationCode :  null
            }
        })

        //send the response

        return NextResponse.json(
            {success : true , message : 'account verified'},
            {status : 204}
        )
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

    static forgotPassword = errorHandler(async (request : NextRequest ,response : NextResponse)=>{
        const body = await request.json()
        console.log(body);
        
        //get the user based on the email
        const user = await AuthServices.getUserByEmail(body.email)
        console.log(user);
        
        //check if the user exists
        if (!user) {
            throw new appError('user does not exists please signup' , 404)
        }

        //create the token
        const token = await AuthServices.createResetToken(body.email)

        //creating the email
        //1- email url
        const url = `http://localhost/3000/forgotPassword/${token}`

        //2- email message
        const message = `forgot your password please follow the link below to reset your password ${url}`

        //sending the email
        sendEmail ({
            subject : 'Reset Password link valid for 10 min',
            email : body.email,
            message
        })
        //sending the response
        return NextResponse.json(
            {success : true , message : 'check your email'},
            {status : 200}
        )
    })

    //reset password function
    static resetPassword = errorHandler(async (request : NextRequest , context : {params :{ token :string}})=>{
        const body = await request.json()
        const {token} = await context.params
        
        //get token from the request url
        const resetToken =  await crypto.createHash('sha256').update(token).digest('hex')
        console.log(0);
        
        //get user from db
        const user = await AuthServices.getUserByToken(body.email , resetToken)
        console.log(user);
        
        //check if user exists
        if (!user) {
            throw new appError('user does not exists' , 404)
        }

        //user password sanitization
        const validatePassword = await Validation.validatePassword(body.password)

        if (!validatePassword ) {
            throw new appError('password not valid' , 400)
        }

        if (!validator.equals(body.password , body.confirmPassword)) {
            throw new appError('password and confirm password are not same' , 400)
        }

        //save the user
        body.password = await AuthServices.hashPassword(body.password)
        const newuser = await AuthServices.saveResetPasswordUser(body.email , body.password)

        return NextResponse.json(
            {
                success : true,
                message : 'password tbdl',
                data : {
                    newuser
                }
            }
        )

    })

    //log out function
    static logOut = errorHandler (async (request : NextRequest ,res : NextResponse) =>{
        //updating the lastActive field for the user
        console.log(7);
        
        const token = await AuthServices.getToken(request)
        console.log(token);

        //check if token exists
        if (!token) {
            throw new appError('you are not logged in', 401)
        }
        const decoded = await AuthMiddleware.verifyToken(token)

        console.log(decoded);
        if (!decoded) {
            throw new appError('invalid token' , 401)
        }
        console.log('test');
        
        //updating the last active field for the user
        const user = await  AuthServices.settingLastActive(decoded.id , decoded.name)
        console.log(user);
        if(!user){
            throw new appError('user not found' , 404)
        }
        //clear cookies
        console.log(8);
        
        
        const response = NextResponse.json(
            {success : true , message : 'logged out successfully'},
            {status : 200}
        )
        response.cookies.delete('jwt' , AuthServices.cookiesOptions())


        return response
    })
}