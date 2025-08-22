import { NextResponse , NextRequest } from "next/server";
import  {appError}  from "./appError";

type Handle = (req : NextRequest , res : NextResponse , context?: any) => Promise <NextResponse>;

export function errorHandler (fn: Handle) : Handle {
    return async (req : NextRequest , res : NextResponse , context?: any) : Promise<NextResponse> =>{
        try {
            return await fn(req , res,  context)
        } catch (err : any) {
            return NextResponse.json(
                {message : err instanceof appError ? err.message : "Internal Server Error"},
                {status : err instanceof appError ? err.statusCode : 500}
            )
        }
    }
}