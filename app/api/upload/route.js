import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get('image');

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Add timestamp prefix to the file name
    const timestamp = Date.now(); // Get the current timestamp
    const fileName = `${timestamp}_${file.name}`; // Append timestamp to the file name

    const path = join(process.cwd(), 'public', 'schoolImages', fileName);
    await writeFile(path, buffer);

    console.log("File uploaded successfully:", fileName);
    return NextResponse.json({ success: true, imagePath: fileName });
  } catch (error) {
    console.error("Error in file upload:", error);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}


