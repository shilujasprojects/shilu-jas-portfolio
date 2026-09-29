import { NextResponse } from "next/server";
import { saveContactMessage } from "@/lib/data";
import { ContactMessage } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const newMessage: ContactMessage = {
      id: `msg-${Date.now()}`,
      name,
      email,
      subject: subject || "Portfolio Inquiry",
      message,
      timestamp: new Date().toISOString(),
    };

    await saveContactMessage(newMessage);

    return NextResponse.json({
      success: true,
      message: "Message received successfully. Thank you for reaching out!",
      id: newMessage.id,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error processing contact request" },
      { status: 500 }
    );
  }
}
