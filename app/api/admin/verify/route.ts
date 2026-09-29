import { NextResponse } from "next/server";

const ADMIN_PIN = process.env.ADMIN_PIN || "luttapi";
const JWT_SECRET = process.env.JWT_SECRET || "shilu_jas_super_secret_jwt_key_2026_x89a2b";

export async function POST(request: Request) {
  try {
    const { pin } = await request.json();

    if (pin && (pin === ADMIN_PIN || pin === process.env.ADMIN_PIN)) {
      return NextResponse.json({
        success: true,
        token: `auth-token-${Date.now()}`,
      });
    }

    return NextResponse.json(
      { error: "Invalid Passcode. Hint: Whom you love the most, their nickname" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Server error during verification" },
      { status: 500 }
    );
  }
}
