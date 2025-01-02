'use server'

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { originalUrl, shortUrl } = body;

    if (!originalUrl || !shortUrl) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const existingUrl = await prisma.saved_url.findUnique({
      where: { shortUrl },
    });

    if (existingUrl) {
      return NextResponse.json({ error: "Short URL already exists" }, { status: 409 });
    }

    const savedUrl = await prisma.saved_url.create({
      data: {
        originalUrl,
        shortUrl,
      },
    });

    return NextResponse.json({ success: true, savedUrl });
  } catch (error) {
    console.error("Error saving URL:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}