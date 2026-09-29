import { NextResponse } from "next/server";
import { getPortfolioData, savePortfolioData } from "@/lib/data";
import { PortfolioData } from "@/lib/types";

export async function GET() {
  try {
    const data = await getPortfolioData();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch portfolio data" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body: Partial<PortfolioData> = await request.json();
    const currentData = await getPortfolioData();
    
    const updatedData: PortfolioData = {
      ...currentData,
      ...body,
    };
    
    const success = await savePortfolioData(updatedData);
    if (!success) {
      return NextResponse.json(
        { error: "Failed to save portfolio data" },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ success: true, data: updatedData });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid data payload" },
      { status: 400 }
    );
  }
}
