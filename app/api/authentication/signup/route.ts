import { NextResponse , NextRequest }  from 'next/server'
import { AuthController } from '@/backend/controllers/authController'

export async function POST(request : NextRequest){    
    return AuthController.signup(request)
}