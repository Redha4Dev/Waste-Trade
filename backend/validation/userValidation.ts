import {z} from 'zod'

                                
export class userValidation {
    static  validateEmail(email : string) {
        const emailSchema = z
                              .string()
                              .email('Please Enter valid email')
                              .min(1 , 'email required')
                              .max(254 , 'email too long')
                              .regex(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
                              .transform((val) => val.trim().toLowerCase())

        return emailSchema.safeParse(email)
    }

    static validateUsername (username : string) {
        const usernameSchema = z
                                 .string()
                                 .trim()
                                 .min(1 , 'username must have at leas one character')
                                 .max(30 , 'username too much long')
                                 .toLowerCase()
    
        return usernameSchema.safeParse(username)

    }

    static validatePhone (phone : string) {
        const phoneSchema = z
                              .string()
                              .length(10 , 'phone number must be exactly 10 digits')
                              .trim()
                              .regex(/^[0-9]+$/, "Phone number must contain only digits");
                
        return phoneSchema.safeParse(phone)
    }

    static validatePassword (password : string) {
        const passwordSchema =  z
                                 .string()
                                 .min(8 , 'password too short')
                                 .max(24 , 'password too long')
                                 .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,"Password must contain at least one uppercase, one lowercase, one number, and one special character");

        return passwordSchema.safeParse(password)
    }

    static validateData (data : any){

        const errors : string [] = []
        if (data.email) {
            if(!this.validateEmail(data.email).success){ errors.push(this.validateEmail(data.email).error.message)}   
        }
        if (data.username) {
            if(!this.validateUsername(data.username).success) {errors.push(this.validateUsername(data.username).error.message) }
        }
        if (data.phone) {
            if(!this.validatePhone(data.phone).success) {errors.push(this.validatePhone(data.phone).error.message)} 
        }
        
        return errors
    }


    static sanitizeUserData (data : any){

        return {
            email : data.email?.trim().toLowerCase() ,
            username : data.username?.trim().toLowerCase(),
            password : data.password?.trim(),
            phone : data.phone?.trim()
        }
    }

}