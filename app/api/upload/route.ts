import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    // Validate that it's a PDF
    const fileName = file.name;
    if (!fileName.toLowerCase().endsWith(".pdf")) {
      return NextResponse.json(
        { error: "Only PDF files (.pdf) are allowed for certificates." },
        { status: 400 }
      );
    }

    // Ensure target directory exists in public/certificates
    const uploadDir = path.join(process.cwd(), "public", "certificates");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Generate safe unique filename
    const safeBaseName = path.basename(fileName, ".pdf").replace(/[^a-zA-Z0-9_-]/g, "_");
    const uniqueFileName = `${safeBaseName}-${Date.now()}.pdf`;
    const filePath = path.join(uploadDir, uniqueFileName);

    // Convert file arrayBuffer to Buffer and save to disk
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/certificates/${uniqueFileName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: fileName,
      message: "Certificate PDF uploaded successfully!",
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload certificate PDF file." },
      { status: 500 }
    );
  }
}
