import {z} from 'zod'

                                
export class userValidation {
    static  validateEmail(email : string) {
        const emailSchema = z
                              .string()
                              .email('Please Enter valid email')
                              .min(1 , 'email required')
                              .max(254 , 'email too long')
                              .regex(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
                              .toLowerCase()
                              .transform((val) => val.trim().toLowerCase())

        return emailSchema.safeParse(email)
    }

    static validatePassword (password : string) {
        const passwordSchema =  z
                                 .string()
                                 .min(6 , 'password too short')
                                 .max(32 , 'password too long')
                                //  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')

        return passwordSchema.safeParse(password).success
    }

    static validateData (data : any){

        
    }

}