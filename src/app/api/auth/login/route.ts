import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "src/server/db";
import { signToken } from "src/server/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email & password required" },
        { status: 400 }
      );
    }

  const { db } = await connectToDatabase();

  const user = await db.collection("users").findOne({ email });
    if (!user)
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );

    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );

  const token = signToken({ uid: user.uid, email: user.email });
    return NextResponse.json(
      {
        token,
        user: {
          uid: user.uid,
          username: user.username,
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: user.role,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
