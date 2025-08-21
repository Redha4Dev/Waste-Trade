import { NextResponse , NextRequest } from "next/server";
import  {appError}  from "./appError";

type Handle = (req : NextRequest) => Promise <NextResponse>;

export function errorHandler (fn: Handle) : Handle {
    return async (req : NextRequest) : Promise<NextResponse> =>{
        try {
            return await fn(req)
        } catch (err : any) {
            return NextResponse.json(
                {message : err instanceof appError ? err.message : "Internal Server Error"},
                {status : err instanceof appError ? err.statusCode : 500}
            )
        }
    }
}