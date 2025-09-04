import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { prisma } from "../lib/prisma";

export async function user() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("jwt")?.value;

    if (!token) {
      return null; // No JWT found
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: number;
      email: string;
    };

    // Option 1: Return decoded data directly
    // return decoded;

    // Option 2 (better): Fetch user from DB to get latest data
    const dbUser = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
      },
    });

    return dbUser;
  } catch (error) {
    console.error("❌ Invalid token:", error);
    return null;
  }
}
