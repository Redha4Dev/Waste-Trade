import { prisma } from "../../lib/prisma";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import {NextRequest} from 'next/server'
export class AuthServices {

   static async getUserByEmail (email : string ){
    return await prisma.user.findUnique({
        where : {
            email
        }
    })
   } 

   static async getUserByToken (email : string , token : string){
    return await prisma.user.findUnique({
        where : {
            email,
            passwordResetToken : token,
            passwordResetTokenExpiresIn :{
                gte :new Date()
            }
        }
    })
   }   

   //hash Password
   static async hashPassword(password: string) { 
       return await bcrypt.hash(password , 12)
   }

   //compare Password
   static async correctPassword(password :string , userPassword : string) {
    return await bcrypt.compare(password , userPassword)
   }

   //create token
   static async createToken (username: string , id : number){
    return jwt.sign({name : username , id : id} , process.env.JWT_SECRET , {expiresIn : process.env.JWT_EXPIRES_IN})
   }

   //get token
   static async getToken (request : NextRequest){
    return request.cookies.get('jwt')?.value
   }

   //setting JWT cookie for the user
   static async cookiesOptions (){
    return {
        expires :new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly : true,
        secure : process.env.NODE_ENV == 'production' ? true : false
    }
   }

   static async verificationCode (email : string) {
    const code = Math.floor(Math.random() *700000 + 1).toString()

    //store the code in the document
    await prisma.user.update({
        where : {
            email,
            isVerified : false
        },
        data : {
            verificationCode : crypto.createHash('sha256').update(code).digest('hex')
        }
    })

    return code
   }

   static async getUserByEmailAndCode(email : string , verificationCode : string){
    return await prisma.user.findUnique({
        where : {
            email,
            verificationCode,
            isVerified : false
        }
    })
   }

   static async createResetToken(email : string) {
    const resetToken = crypto.randomBytes(64).toString('hex')
    await prisma.user.update({
        where : {
            email
        },
        data : {
            passwordResetToken : crypto.createHash('sha256').update(resetToken).digest('hex'),
            passwordResetTokenExpiresIn : new Date(Date.now() + 10*60*1000)
        }
    })
    return resetToken
   }

   //save user after reset password
   static async saveResetPasswordUser(email : string , password: string){
    return await prisma.user.update({
        where : {
            email
        },
        data : {
            password,
            passwordResetToken : null,
            passwordResetTokenExpiresIn : null
        }
    })
   }

   static async settingLastActive(id : number , username : string){
    return await prisma.user.update({
        where : {
            id,
            username
        },
        data :{
            lastActive : new Date()
        }
    })
    
   }

   static async decodeToken (token : any ){
    return await jwt.verify(token , process.env.JWT_SECRET)
   }
}