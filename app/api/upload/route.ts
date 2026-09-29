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

    // Generate safe unique filename
    const safeBaseName = path.basename(fileName, ".pdf").replace(/[^a-zA-Z0-9_-]/g, "_");
    const uniqueFileName = `${safeBaseName}-${Date.now()}.pdf`;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let publicUrl = `/certificates/${uniqueFileName}`;

    try {
      // Ensure target directory exists in public/certificates if filesystem is writable
      const uploadDir = path.join(process.cwd(), "public", "certificates");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      const filePath = path.join(uploadDir, uniqueFileName);
      fs.writeFileSync(filePath, buffer);
      console.log(`✅ Certificate PDF saved locally at ${filePath}`);
    } catch (fsErr) {
      // On read-only serverless environments (like Vercel production), fallback to Data URI
      console.warn("Local filesystem is read-only. Fallback to Data URI representation for serverless runtime.");
      const base64Pdf = buffer.toString("base64");
      publicUrl = `data:application/pdf;base64,${base64Pdf}`;
    }

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: fileName,
      message: "Certificate PDF processed successfully!",
    });
  } catch (error) {
    console.error("Upload route error:", error);
    return NextResponse.json(
      { error: "Failed to process certificate PDF file." },
      { status: 500 }
    );
  }
}
