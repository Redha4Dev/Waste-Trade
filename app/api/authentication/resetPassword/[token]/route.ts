import { AuthController } from "@/backend/controllers/authController";
import { NextRequest  } from "next/server";
// export const POST = AuthController.resetPassword

export async function POST(request : NextRequest , context : {params : {token : string}}){
    return AuthController.resetPassword(request , context)
}
