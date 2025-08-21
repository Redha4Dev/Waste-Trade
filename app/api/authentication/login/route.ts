import {prisma} from '@/lib/prisma'
import { NextRequest , NextResponse } from 'next/server'
import { AuthController } from '@/backend/controllers/authController'

export async function POST(request : NextRequest) {
    return AuthController.login(request)
}