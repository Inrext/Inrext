import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../../../server/db";
import { verifyToken } from "../../../../../server/auth";

export async function GET(
  req: NextRequest,
  context: { params: { uid: string } }
) {
  try {
    const params = context.params;
    const { uid } = params;

    if (!uid || typeof uid !== "string") {
      return NextResponse.json(
        { error: "Invalid or missing UID" },
        { status: 400 }
      );
    }

    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    try {
      verifyToken(token);
    } catch (err) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const { db } = await connectToDatabase();

    let user = null;
    try {
      user = await db
        .collection("users")
        .findOne({ _id: new ObjectId(uid) }, { projection: { password: 0 } });
    } catch {
      user = await db
        .collection("users")
        .findOne({ uid }, { projection: { password: 0 } });
    }

    if (!user)
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );

    return NextResponse.json(
      { user },
      { status: 200 }
    );
  } catch (error) {
    console.error("User fetch error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
