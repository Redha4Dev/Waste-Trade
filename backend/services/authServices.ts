import { prisma } from "../../lib/prisma";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class AuthServices {

    //used in the logIn logic
   static async getUserByEmail (email : string){
    return await prisma.user.findUnique({
        where : {email}
    })
   }

   //hash Password
   static async hashPassword(password: string) {
    return bcrypt.hash(password , 12)
   }

   //compare Password
   static async correctPassword(password :string , userPassword : string) {
    return await bcrypt.compare(password , userPassword)
   }

   //create token
   static async createToken (username: string , id : number){
    return jwt.sign({name : username , id : id} , process.env.JWT_SECRET , {expiresIn : process.env.JWT_EXPIRES_IN})
   }

   //setting JWT cookie for the user
   static async cookiesOptions (){
    return {
        expires :new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly : true,
        secure : process.env.NODE_ENV == 'production' ? true : false
    }

   }
}