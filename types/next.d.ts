export  declare module 'next/server' {
    interface NextRequest {
        user? :{
            username : string | null,
            id : number,
            email : string | null
        }
    }
}